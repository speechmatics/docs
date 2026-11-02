/**
 * A schema table in a guide page, from the same IR and component map as the
 * API reference, so the two always agree:
 *
 *   <Schema ir={batch} type="JobConfig" />
 *   <Schema ir={batch} type="RetrieveTranscriptResponse" open="translations" />
 *   <Schema ir={batch} type="RetrieveTranscriptResponse" property="chapters" />
 *   <Schema ir={batch} type="SummarizationConfig" as="summarization_config" />
 *
 * `type` is a schema's name in the spec. `property` shows one property of it;
 * `as` shows the whole type under a key, as it sits in a request. Either way
 * the one row opens, since its nesting is the point; `expanded` says so for a
 * whole type. `open` opens one field among the rest, by its dotted path, for a
 * guide about that field. A name that is not in the IR fails the build rather
 * than rendering an empty table.
 *
 * The table sits on a card, as the reference's messages do, so it stands apart
 * from the prose around it, headed by the type's name and a link to where the
 * reference uses it.
 */
import DocusaurusLink from "@docusaurus/Link";
import { Card, Code, Flex, Link, Text } from "@radix-ui/themes";
import type { ApiEntry, ApiIR, Node, TypeDef, TypeId } from "@speculoos/core";
import { apiEntries, entrySlug } from "@speculoos/core";
import { type Components, SchemaTable } from "@speculoos/react";
import { type ReactNode, useMemo } from "react";
import { SiteSpeculoos, components, entryUrl } from "./site";

function typeNamed(ir: ApiIR, name: string): TypeDef {
  const found = Object.values(ir.schemas).find((t) => t.name === name);
  if (found === undefined) {
    throw new Error(`<Schema>: no type "${name}" in ${ir.info.title}`);
  }
  return found;
}

/** An object with just `property` — what a table of one row is made from. */
function objectOf(
  source: TypeDef["source"],
  property: { name: string; node: Node; required?: boolean; docs?: object },
): Node {
  return {
    kind: "object",
    source,
    docs: {},
    nullable: false,
    properties: [
      {
        required: false,
        readOnly: false,
        writeOnly: false,
        deprecated: false,
        docs: {},
        ...property,
      },
    ],
    additional: { kind: "any" },
    patternProperties: [],
    constraints: {},
    composedFrom: [],
  } as Node;
}

/** Every type a part of the IR refers to by `$ref`, without following them. */
function refsIn(value: unknown, out = new Set<TypeId>()): Set<TypeId> {
  if (Array.isArray(value)) for (const v of value) refsIn(v, out);
  else if (typeof value === "object" && value !== null) {
    const o = value as Record<string, unknown>;
    if (o.kind === "ref" && typeof o.target === "string")
      out.add(o.target as TypeId);
    for (const v of Object.values(o)) refsIn(v, out);
  }
  return out;
}

/**
 * How many `$ref`s it takes to get from `part` to the type `id`: 1 where `part`
 * names it, more where it is nested in other types; undefined where it never
 * gets there.
 */
function distance(ir: ApiIR, part: unknown, id: TypeId): number | undefined {
  const seen = new Set<TypeId>();
  let level = [...refsIn(part)];
  for (let hops = 1; level.length > 0; hops++) {
    if (level.includes(id)) return hops;
    for (const t of level) seen.add(t);
    level = [
      ...new Set(level.flatMap((t) => [...refsIn(ir.schemas[t]?.node)])),
    ].filter((t) => !seen.has(t));
  }
  return undefined;
}

interface Use {
  entry: ApiEntry;
  /** The message's anchor, for a type a message carries. */
  anchor?: string;
  /** What the link says: the message, or the entry's title. */
  label: string;
}

/**
 * Where the reference shows a type: where it is nearest the top — named
 * outright, else in the fewest types — then what a client sends over what
 * comes back, since a config type is documented where it is sent; then the
 * first in page order. So a transcript's parts link to the transcript
 * endpoint, not to the job that can also return one.
 */
function usageOf(ir: ApiIR, id: TypeId): Use | undefined {
  let best: { use: Use; rank: number } | undefined;
  const consider = (use: Use, part: unknown, sent: boolean) => {
    const hops = distance(ir, part, id);
    if (hops === undefined) return;
    const rank = hops * 2 + (sent ? 0 : 1);
    if (best === undefined || rank < best.rank) best = { use, rank };
  };
  for (const entry of apiEntries(ir)) {
    const operations =
      entry.kind === "operation"
        ? [entry.operation]
        : entry.endpoint.operations;
    const title =
      (entry.kind === "operation"
        ? entry.operation.docs.title
        : entry.endpoint.docs.title) ?? entrySlug(entry);
    for (const op of operations) {
      if (op.kind === "message") {
        for (const message of op.messages)
          consider(
            {
              entry,
              ...(message.slug !== undefined ? { anchor: message.slug } : {}),
              label: message.name,
            },
            message.payload,
            op.direction === "client-sends",
          );
      } else {
        const { responses, ...request } = op;
        consider({ entry, label: title }, request, true);
        consider({ entry, label: title }, responses, false);
      }
    }
  }
  return best?.use;
}

function hrefOf(ir: ApiIR, use: Use): string | undefined {
  const url = entryUrl(ir, use.entry);
  if (url === undefined) return undefined;
  return use.anchor !== undefined ? `${url}#${use.anchor}` : url;
}

/**
 * The map's field row, with the rows on `path` open: the field, the ones it
 * sits in, and everything in it — the guide is about that field. Array steps
 * ("[]") are not part of a path as written.
 */
function openingRow(path: string): Components["FieldRow"] {
  const Row = components.FieldRow;
  const open = path.split(".");
  return function OpeningRow(props) {
    const at = props.field.path.filter((step) => step !== "[]");
    const shared = Math.min(at.length, open.length);
    const onPath =
      at.length > 0 && at.slice(0, shared).every((step, i) => step === open[i]);
    return <Row {...props} expanded={props.expanded || onPath} />;
  };
}

/** A field's path, to check `open` against: the rows a table shows. */
function hasPath(ir: ApiIR, def: TypeDef, path: string): boolean {
  let node: Node | undefined = def.node;
  for (const step of path.split(".")) {
    while (node?.kind === "ref") node = ir.schemas[node.target]?.node;
    while (node?.kind === "array") node = node.items;
    while (node?.kind === "ref") node = ir.schemas[node.target]?.node;
    if (node?.kind !== "object") return false;
    node = node.properties.find((p) => p.name === step)?.node;
  }
  return node !== undefined;
}

export function Schema({
  ir,
  type,
  property,
  as,
  expanded,
  open,
}: {
  ir: ApiIR;
  type: string;
  property?: string;
  as?: string;
  expanded?: boolean;
  open?: string;
}): ReactNode {
  const def = typeNamed(ir, type);
  if (open !== undefined && !hasPath(ir, def, open)) {
    throw new Error(`<Schema>: ${type} has no field "${open}"`);
  }
  let node: Node | undefined;
  if (property !== undefined) {
    const own =
      def.node.kind === "object"
        ? def.node.properties.find((p) => p.name === property)
        : undefined;
    if (own === undefined) {
      throw new Error(`<Schema>: ${type} has no property "${property}"`);
    }
    node = objectOf(def.source, own);
  } else if (as !== undefined) {
    node = objectOf(def.source, {
      name: as,
      node: {
        kind: "ref",
        target: def.id,
        source: def.source,
        docs: {},
        nullable: false,
      } as Node,
    });
  }
  const all = expanded ?? (property !== undefined || as !== undefined);
  const use = useMemo(() => usageOf(ir, def.id), [ir, def.id]);
  const href = use && hrefOf(ir, use);
  const overrides = useMemo(
    () => (open !== undefined ? { FieldRow: openingRow(open) } : undefined),
    [open],
  );
  return (
    <SiteSpeculoos ir={ir} {...(overrides ? { overrides } : {})}>
      <Card size="1" my="4">
        {/* The rows' own top rules separate them from this, so the card's edge is not doubled. */}
        <Flex justify="between" align="baseline" gap="3" wrap="wrap" pt="1">
          <Text size="2" weight="bold">
            <Code variant="ghost" color="gray" highContrast>
              {property !== undefined ? `${type}.${property}` : type}
            </Code>
          </Text>
          {use !== undefined && href !== undefined && (
            <Text size="1">
              <Text color="gray">In the API reference:</Text>{" "}
              <Link asChild underline="hover">
                <DocusaurusLink to={href}>{use.label}</DocusaurusLink>
              </Link>
            </Text>
          )}
        </Flex>
        {node === undefined ? (
          <SchemaTable typeId={def.id} expanded={all} />
        ) : (
          <SchemaTable node={node} expanded={all} />
        )}
      </Card>
    </SiteSpeculoos>
  );
}
