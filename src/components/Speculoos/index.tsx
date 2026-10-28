/**
 * Speculoos pilot: API reference rendered from Speculoos IR through the Radix
 * Themes component map. The IR is built from spec/ by `npm run build:speculoos-ir`.
 *
 * The site's own <Theme> (src/theme/Root.tsx) already wraps every page, so the
 * map picks up the cyan accent with nothing passed here.
 */
import type { ApiEntry, ApiIR, WsMessage } from "@speculoos/core";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { Box, Callout, Flex, Grid } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { radixThemes } from "@speculoos/map-radix-themes";
import { Entry, SpeculoosProvider, useEntries } from "@speculoos/react";
import { defaultHref, entrySlug, type HrefTarget } from "@speculoos/core";
import Markdown from "@theme/Markdown";
import { hasOperationPanel, OperationPanel } from "./OperationPanel";
import { SessionPanel } from "./SessionPanel";
import styles from "./styles.module.css";
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

/**
 * The sidebar's badge colours (src/css/badge.css), so a method or protocol
 * reads the same in the reference as it does in the navigation. A channel's
 * directions share the WebSocket colour; the arrow says which way.
 */
const SIDEBAR_COLORS = {
  method: { get: "cyan", post: "green", put: "yellow", delete: "red" },
  direction: { "client-sends": "teal", "server-sends": "teal" },
  tone: { protocol: "teal" },
} as const;

const components = radixThemes({
  markdown: ({ children }: { children: string }) => <Markdown>{children}</Markdown>,
  messageExtras: MessageAvailability,
  colors: SIDEBAR_COLORS,
});

/**
 * Types are expanded where they are used, collapsed behind the map's "Show N
 * properties" toggle, rather than collected in a Types section a reader has to
 * jump to and back from. So a type name is not a link: there is nowhere to go.
 */
const options = {
  expandRefs: "always",
  // Examples sit in the panel beside the reference instead; see Entries.
  inlineExamples: false,
  href: (target: HrefTarget) => (target.kind === "type" ? undefined : defaultHref(target)),
} as const;

/**
 * Each entry with a panel beside it that stays in view while the reference
 * scrolls — Deepgram's and Stripe's layout: a channel's session at a glance,
 * or a REST operation's examples. Below the `lg` breakpoint there is no room
 * beside, and the panel follows the entry.
 *
 * `after` is the page's own content for the end of the reference column: for
 * a channel, how the connection closes.
 */
/**
 * The anchors an entry renders — its own, its operations' and its messages' —
 * as Docusaurus's link checker needs to be told of them: it only sees the
 * headings it renders itself.
 */
function anchorsOf(entry: ApiEntry): string[] {
  const operations = entry.kind === "operation" ? [entry.operation] : entry.endpoint.operations;
  return [
    entrySlug(entry),
    ...operations.flatMap((op) => [
      op.slug,
      ...(op.kind === "message" ? op.messages.map((m) => m.slug).filter((s): s is string => s !== undefined) : []),
    ]),
  ];
}

function Entries({ only, handshakeExtras, after }: {
  only?: string;
  handshakeExtras?: ReactNode;
  after?: ReactNode;
}): ReactNode {
  const entries = useEntries().filter((entry) => only === undefined || entrySlug(entry) === only);
  const brokenLinks = useBrokenLinks();
  for (const entry of entries) for (const anchor of anchorsOf(entry)) brokenLinks.collectAnchor(anchor);
  return (
    <>
      {entries.map((entry) => {
        // An operation with no code samples or examples has no panel, and its reference takes the width.
        const panel = entry.kind === "channel" || hasOperationPanel(entry);
        return (
          <Grid
            key={entrySlug(entry)}
            columns={{ initial: "1", lg: panel ? "minmax(0, 1fr) 380px" : "1" }}
            gap="6"
          >
            <Box minWidth="0">
              {/* Level 1: one entry per page, so its heading — title and URL — is the page's. */}
              <Entry entry={entry} level={1} handshakeExtras={handshakeExtras} />
              {after}
            </Box>
            {panel && (
              // mt matches the entry section's own top margin, so the two headings line up.
              <Box mt="7" className={styles.panel}>
                {entry.kind === "channel" ? <SessionPanel entry={entry} /> : <OperationPanel entry={entry} />}
              </Box>
            )}
          </Grid>
        );
      })}
    </>
  );
}

/**
 * Every entry in an API, one after another — or just one, by its slug
 * (`entrySlug`), for a page per entry. `handshakeExtras` and `after` are the
 * page's own prose: for the end of a channel's Handshake section, and for
 * after an entry.
 */
export function SpeculoosReference({
  ir,
  entry,
  handshakeExtras,
  after,
}: {
  ir: ApiIR;
  entry?: string;
  handshakeExtras?: ReactNode;
  after?: ReactNode;
}): ReactNode {
  return (
    <SpeculoosProvider ir={ir} components={components} options={options}>
      <Entries {...(entry !== undefined ? { only: entry } : {})} handshakeExtras={handshakeExtras} after={after} />
    </SpeculoosProvider>
  );
}
