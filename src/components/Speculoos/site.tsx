/**
 * How this site renders Speculoos IR, for the API reference and for schema
 * tables in guide pages alike: the Radix Themes component map with the site's
 * Markdown, message extensions and badge colours, and the rendering options.
 *
 * The site's own <Theme> (src/theme/Root.tsx) already wraps every page, so the
 * map picks up the cyan accent with nothing passed here.
 */
import { Callout, Flex } from "@radix-ui/themes";
import type { ApiIR, WsMessage } from "@speculoos/core";
import { type HrefTarget, defaultHref } from "@speculoos/core";
import { radixThemes } from "@speculoos/map-radix-themes";
import { SpeculoosProvider } from "@speculoos/react";
import { InfoIcon } from "lucide-react";
import type { ReactNode } from "react";
import Markdown from "../Markdown";

/**
 * This site's own message extensions, as a callout at the top of a message's
 * card. No spec sets them today; this is where they render when one does.
 */
function MessageAvailability({ message }: { message: WsMessage }): ReactNode {
  const x = message.docs.extensions ?? {};
  const deployments = x["x-available-deployments"] as string[] | undefined;
  const preview = x["x-preview-mode"] === true;
  if (deployments === undefined && !preview) return null;
  let text = "Currently available";
  if (preview) text += " in [preview mode](/private/preview-mode)";
  if (deployments)
    text += ` ${preview ? "and" : "for"} ${deployments.join(" and ")} deployments`;
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

/**
 * Descriptions go through the site's Markdown component, so they get the same
 * typography and admonitions as hand-written pages. It uses rehype-raw without
 * a sanitiser: fine for first-party specs, not for anything else.
 */
const components = radixThemes({
  markdown: ({ children }: { children: string }) => (
    <Markdown>{children}</Markdown>
  ),
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
  // Examples sit in the panel beside the reference instead.
  inlineExamples: false,
  href: (target: HrefTarget) =>
    target.kind === "type" ? undefined : defaultHref(target),
} as const;

/** Speculoos for `ir`, rendered as this site renders it. */
export function SiteSpeculoos({
  ir,
  children,
}: {
  ir: ApiIR;
  children: ReactNode;
}): ReactNode {
  return (
    <SpeculoosProvider ir={ir} components={components} options={options}>
      {children}
    </SpeculoosProvider>
  );
}
