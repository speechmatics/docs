/**
 * A schema table in a guide page, from the same IR and component map as the
 * API reference, so the two always agree:
 *
 *   <Schema ir={batch} type="JobConfig" />
 *   <Schema ir={batch} type="RetrieveTranscriptResponse" property="chapters" />
 *   <Schema ir={batch} type="SummarizationConfig" as="summarization_config" />
 *
 * `type` is a schema's name in the spec. `property` shows one property of it;
 * `as` shows the whole type under a key, as it sits in a request. Either way
 * the one row opens, since its nesting is the point; `expanded` says so for a
 * whole type. A name that is not in the IR fails the build rather than
 * rendering an empty table.
 */
import type { ApiIR, Node, TypeDef } from "@speculoos/core";
import { SchemaTable } from "@speculoos/react";
import type { ReactNode } from "react";
import { SiteSpeculoos } from "./site";

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

export function Schema({
  ir,
  type,
  property,
  as,
  expanded,
}: {
  ir: ApiIR;
  type: string;
  property?: string;
  as?: string;
  expanded?: boolean;
}): ReactNode {
  const def = typeNamed(ir, type);
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
  const open = expanded ?? (property !== undefined || as !== undefined);
  return (
    <SiteSpeculoos ir={ir}>
      {node === undefined ? (
        <SchemaTable typeId={def.id} expanded={open} />
      ) : (
        <SchemaTable node={node} expanded={open} />
      )}
    </SiteSpeculoos>
  );
}
