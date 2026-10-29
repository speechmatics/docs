import { Box, Heading } from "@radix-ui/themes";
/**
 * The panel beside a REST operation: how to call it, then what comes back —
 * the spec's `x-codeSamples` as tabs, and the operation's examples gathered
 * by Speculoos. Stripe's and Deepgram's right-hand column.
 *
 * Code samples are a vendor extension (Redoc's `x-codeSamples`), so Speculoos
 * leaves them in the operation's extensions and this site renders them.
 */
import {
  type ApiEntry,
  type EntryExample,
  entryExamples,
} from "@speculoos/core";
import { useComponents } from "@speculoos/react";
import CodeBlock from "@theme/CodeBlock";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import type { ReactNode } from "react";

interface CodeSample {
  lang: string;
  label?: string;
  source: string;
}

/** Prism's name for a sample's language, where the spec's differs. */
const PRISM: Record<string, string> = {
  javascript: "js",
  shell: "bash",
  curl: "bash",
};

function codeSamplesOf(entry: ApiEntry): CodeSample[] {
  if (entry.kind !== "operation") return [];
  const raw = entry.operation.docs.extensions?.["x-codeSamples"];
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is CodeSample =>
      typeof s === "object" &&
      s !== null &&
      typeof s.lang === "string" &&
      typeof s.source === "string",
  );
}

/**
 * What a reader looks for first: the request's examples, then success, then
 * errors.
 */
function examplesOf(entry: ApiEntry): EntryExample[] {
  const rank = (e: EntryExample) =>
    e.of.kind === "request"
      ? 0
      : e.of.kind === "response" && e.of.status.startsWith("2")
        ? 1
        : 2;
  return entryExamples(entry).sort((a, b) => rank(a) - rank(b));
}

/**
 * The status's own description, to its first clause: "Created", "Bad
 * request", "Project deleted". The example's name says nothing —
 * swagger2openapi names every converted example "response" — and Speculoos's
 * label calls each one "Response", which reads as a repeat of the reference's
 * Responses section beside it.
 */
function statusText(example: EntryExample): string | undefined {
  if (example.of.kind !== "response") return undefined;
  const { status } = example.of;
  const response = example.of.operation.responses.find(
    (r) => r.status === status,
  );
  const text = response?.docs.description ?? response?.docs.title;
  return text?.split(/[.,;\n]/)[0]?.trim() || undefined;
}

/** A status badge and what the status means; a request, and its media type. */
function ExampleLabel({ example }: { example: EntryExample }): ReactNode {
  const C = useComponents();
  if (example.of.kind === "response")
    return (
      <>
        <C.Badge tone="status" value={example.of.status}>
          {example.of.status}
        </C.Badge>{" "}
        {statusText(example) ?? "Response"}
      </>
    );
  if (example.of.kind === "request")
    return (
      <>
        Request{" "}
        <C.Badge tone="mediaType" value={example.of.mediaType}>
          {example.of.mediaType}
        </C.Badge>
      </>
    );
  return example.of.message.title ?? example.of.message.name;
}

/**
 * Every example on the operation, as Speculoos's `<EntryExamples>` lists them,
 * but labelled by what each status means.
 */
function Examples({ entry }: { entry: ApiEntry }): ReactNode {
  const C = useComponents();
  const examples = examplesOf(entry);
  if (examples.length === 0) return null;
  return (
    <C.Section kind="examples" title="Examples" level={3}>
      <C.Tabs
        kind="examples"
        tabs={examples.map((example) => ({
          id: example.id,
          label: <ExampleLabel example={example} />,
          content: (
            <>
              {example.summary !== undefined && (
                <C.Markdown>{example.summary}</C.Markdown>
              )}
              {example.description !== undefined && (
                <C.Markdown>{example.description}</C.Markdown>
              )}
              {example.externalValue !== undefined ? (
                <C.Link
                  href={example.externalValue}
                  target={{ kind: "external", url: example.externalValue }}
                >
                  {example.externalValue}
                </C.Link>
              ) : typeof example.value === "string" ? (
                // A plain-text transcript, say: as it comes, not as a JSON string.
                <C.CodeBlock language="text">{example.value}</C.CodeBlock>
              ) : (
                <C.CodeBlock language="json">
                  {JSON.stringify(example.value, null, 2)}
                </C.CodeBlock>
              )}
            </>
          ),
        }))}
      />
    </C.Section>
  );
}

/** Whether the panel has anything to show: without, the page leaves no room for it. */
export function hasOperationPanel(entry: ApiEntry): boolean {
  return codeSamplesOf(entry).length > 0 || entryExamples(entry).length > 0;
}

export function OperationPanel({ entry }: { entry: ApiEntry }): ReactNode {
  const samples = codeSamplesOf(entry);
  return (
    <Box>
      {samples.length > 0 && (
        <Box mb="5">
          <Heading as="h3" size="5" mb="3">
            Request
          </Heading>
          <Tabs groupId="code-sample-language">
            {samples.map((sample) => {
              const lang = sample.lang.toLowerCase();
              return (
                <TabItem
                  key={lang}
                  value={lang}
                  label={sample.label ?? sample.lang}
                >
                  <CodeBlock language={PRISM[lang] ?? lang}>
                    {sample.source}
                  </CodeBlock>
                </TabItem>
              );
            })}
          </Tabs>
        </Box>
      )}
      <Examples entry={entry} />
    </Box>
  );
}
