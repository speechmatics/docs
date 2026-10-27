/**
 * Speculoos pilot: API reference rendered from Speculoos IR through the Radix
 * Themes component map. The IR is built from spec/ by `npm run build:speculoos-ir`.
 *
 * The site's own <Theme> (src/theme/Root.tsx) already wraps every page, so the
 * map picks up the cyan accent with nothing passed here.
 */
import type { ApiIR, WsMessage } from "@speculoos/core";
import { Callout, Flex } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { radixThemes } from "@speculoos/map-radix-themes";
import { Entry, SpeculoosProvider, useEntries } from "@speculoos/react";
import { defaultHref, entrySlug, type HrefTarget } from "@speculoos/core";
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
  href: (target: HrefTarget) => (target.kind === "type" ? undefined : defaultHref(target)),
} as const;

function Entries(): ReactNode {
  return (
    <>
      {useEntries().map((entry) => (
        <Entry key={entrySlug(entry)} entry={entry} level={2} />
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
