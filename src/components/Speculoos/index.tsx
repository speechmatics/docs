/**
 * Speculoos pilot: API reference rendered from Speculoos IR through the Radix
 * Themes component map. The IR is built from spec/ by `npm run build:speculoos-ir`.
 *
 * The site's own <Theme> (src/theme/Root.tsx) already wraps every page, so the
 * map picks up the cyan accent with nothing passed here.
 */
import type { ApiIR, WsMessage } from "@speculoos/core";
import { Box, Callout, Flex, Grid } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { radixThemes } from "@speculoos/map-radix-themes";
import { Entry, EntryExamples, SpeculoosProvider, useEntries } from "@speculoos/react";
import { defaultHref, entryExamples, entrySlug, type ApiEntry, type EntryExample, type HrefTarget } from "@speculoos/core";
import Markdown from "@theme/Markdown";
import type { ReactNode } from "react";

/**
 * The site's Markdown component: react-markdown with the site's MDX components,
 * so descriptions get the same typography and admonitions as hand-written pages.
 * Note it uses rehype-raw without a sanitiser — fine for first-party specs, not
 * for anything else.
 */
/**
 * This site's own message extensions, as a callout at the top of a message's
 * card — the same wording `AsyncAPIMessage` uses. No spec sets them today; this
 * is where they render when one does.
 */
function MessageAvailability({ message }: { message: WsMessage }): ReactNode {
  const x = message.docs.extensions ?? {};
  const deployments = x["x-available-deployments"] as string[] | undefined;
  const preview = x["x-preview-mode"] === true;
  if (deployments === undefined && !preview) return null;
  let text = "Currently available";
  if (preview) text += " in [preview mode](/private/preview-mode)";
  if (deployments) text += ` ${preview ? "and" : "for"} ${deployments.join(" and ")} deployments`;
  return (
    <Flex mb="2">
      <Callout.Root size="1" color="gray">
        <Callout.Icon>
          <InfoIcon size="12" />
        </Callout.Icon>
        <Callout.Text>
          <Markdown>{`${text}.`}</Markdown>
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}

const components = radixThemes({
  markdown: ({ children }: { children: string }) => <Markdown>{children}</Markdown>,
  messageExtras: MessageAvailability,
});

/**
 * Types are expanded where they are used, collapsed behind the map's "Show N
 * properties" toggle, rather than collected in a Types section a reader has to
 * jump to and back from. So a type name is not a link: there is nowhere to go.
 */
const options = {
  expandRefs: "always",
  // Examples sit in a panel beside the reference instead; see Entries.
  inlineExamples: false,
  href: (target: HrefTarget) => (target.kind === "type" ? undefined : defaultHref(target)),
} as const;

/**
 * The order messages pass in a realtime session — the protocol overview's
 * diagram — which a spec has no way to say. Examples follow it, so the panel
 * reads as one session from start to finish; anything unlisted goes last.
 */
const SESSION_ORDER = [
  "StartRecognition",
  "RecognitionStarted",
  "AddAudio",
  "AudioAdded",
  "AddPartialTranscript",
  "AddTranscript",
  "EndOfStream",
  "EndOfTranscript",
  "Error",
];

function inSessionOrder(entry: ApiEntry): EntryExample[] {
  const rank = (e: EntryExample) => {
    const i = e.of.kind === "message" ? SESSION_ORDER.indexOf(e.of.message.name) : -1;
    return i === -1 ? SESSION_ORDER.length : i;
  };
  return entryExamples(entry).sort((a, b) => rank(a) - rank(b));
}

/**
 * Each entry with its examples beside it, in a panel that stays in view while
 * the reference scrolls — Deepgram's and Stripe's layout. Below the `lg`
 * breakpoint there is no room beside, and the examples follow the entry.
 */
function Entries(): ReactNode {
  return (
    <>
      {useEntries().map((entry) => (
        <Grid key={entrySlug(entry)} columns={{ initial: "1", lg: "minmax(0, 1fr) 380px" }} gap="6">
          <Entry entry={entry} level={2} />
          <Box style={{ position: "sticky", top: "calc(var(--ifm-navbar-height) + 1rem)", alignSelf: "start" }}>
            <EntryExamples entry={entry} level={3} examples={inSessionOrder(entry)} />
          </Box>
        </Grid>
      ))}
    </>
  );
}

/** Every entry in an API, one after another. */
export function SpeculoosReference({ ir }: { ir: ApiIR }): ReactNode {
  return (
    <SpeculoosProvider ir={ir} components={components} options={options}>
      <Entries />
    </SpeculoosProvider>
  );
}
