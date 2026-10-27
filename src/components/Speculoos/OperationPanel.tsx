/**
 * The panel beside a REST operation: how to call it, then what comes back —
 * the spec's `x-codeSamples` as tabs, and the operation's examples gathered
 * by Speculoos. Stripe's and Deepgram's right-hand column.
 *
 * Code samples are a vendor extension (Redoc's `x-codeSamples`), so Speculoos
 * leaves them in the operation's extensions and this site renders them.
 */
import { entryExamples, type ApiEntry, type EntryExample } from "@speculoos/core";
import { Box, Heading } from "@radix-ui/themes";
import { EntryExamples } from "@speculoos/react";
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
const PRISM: Record<string, string> = { javascript: "js", shell: "bash", curl: "bash" };

function codeSamplesOf(entry: ApiEntry): CodeSample[] {
  if (entry.kind !== "operation") return [];
  const raw = entry.operation.docs.extensions?.["x-codeSamples"];
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is CodeSample => typeof s === "object" && s !== null && typeof s.lang === "string" && typeof s.source === "string",
  );
}

/**
 * What a reader looks for first: the request's examples, then success, then
 * errors. Unnamed — swagger2openapi names every converted example "response",
 * which says nothing; the label already says what each is.
 */
function examplesOf(entry: ApiEntry): EntryExample[] {
  const rank = (e: EntryExample) =>
    e.of.kind === "request" ? 0 : e.of.kind === "response" && e.of.status.startsWith("2") ? 1 : 2;
  return entryExamples(entry)
    .map(({ name: _name, ...e }) => e)
    .sort((a, b) => rank(a) - rank(b));
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
                <TabItem key={lang} value={lang} label={sample.label ?? sample.lang}>
                  <CodeBlock language={PRISM[lang] ?? lang}>{sample.source}</CodeBlock>
                </TabItem>
              );
            })}
          </Tabs>
        </Box>
      )}
      <EntryExamples entry={entry} level={3} title="Responses" examples={examplesOf(entry)} />
    </Box>
  );
}
