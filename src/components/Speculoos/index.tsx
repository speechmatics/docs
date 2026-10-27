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
import { defaultHref, entrySlug, type HrefTarget } from "@speculoos/core";
import Markdown from "@theme/Markdown";
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
function Entries({ handshakeExtras, after }: { handshakeExtras?: ReactNode; after?: ReactNode }): ReactNode {
  return (
    <>
      {useEntries().map((entry) => (
        <Grid key={entrySlug(entry)} columns={{ initial: "1", lg: "minmax(0, 1fr) 380px" }} gap="6">
          <Box minWidth="0">
            <Entry entry={entry} level={2} handshakeExtras={handshakeExtras} />
            {after}
          </Box>
          {/* mt matches the entry section's own top margin, so the two headings line up. */}
          <Box mt="7" className={styles.panel}>
            {entry.kind === "channel" ? <SessionPanel entry={entry} /> : <EntryExamples entry={entry} level={3} />}
          </Box>
        </Grid>
      ))}
    </>
  );
}

/**
 * Every entry in an API, one after another. `handshakeExtras` and `after` are
 * the page's own prose: for the end of a channel's Handshake section, and for
 * after its messages.
 */
export function SpeculoosReference({
  ir,
  handshakeExtras,
  after,
}: {
  ir: ApiIR;
  handshakeExtras?: ReactNode;
  after?: ReactNode;
}): ReactNode {
  return (
    <SpeculoosProvider ir={ir} components={components} options={options}>
      <Entries handshakeExtras={handshakeExtras} after={after} />
    </SpeculoosProvider>
  );
}
