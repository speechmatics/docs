/**
 * The API reference, rendered from Speculoos IR (src/generated/, built from
 * spec/ by `npm run build:speculoos-ir`). Pages are generated, one per entry,
 * by scripts/generate-speculoos-pages.ts.
 */
import DocusaurusLink from "@docusaurus/Link";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { Box, Flex, Grid, Heading, Link } from "@radix-ui/themes";
import type { ApiEntry, ApiIR } from "@speculoos/core";
import { entrySlug } from "@speculoos/core";
import { Entry, useComponents, useEntries } from "@speculoos/react";
import type { ReactNode } from "react";
import { OperationPanel, hasOperationPanel } from "./OperationPanel";
import { SessionPanel, hasSessionPanel } from "./SessionPanel";
import { SiteSpeculoos, entryUrl } from "./site";
import styles from "./styles.module.css";

export { Schema } from "./Schema";

/**
 * The anchors an entry renders — its own, its operations' and its messages' —
 * as Docusaurus's link checker needs to be told of them: it only sees the
 * headings it renders itself.
 */
function anchorsOf(entry: ApiEntry): string[] {
  const operations =
    entry.kind === "operation" ? [entry.operation] : entry.endpoint.operations;
  return [
    entrySlug(entry),
    ...operations.flatMap((op) => [
      op.slug,
      ...(op.kind === "message"
        ? op.messages
            .map((m) => m.slug)
            .filter((s): s is string => s !== undefined)
        : []),
    ]),
  ];
}

/**
 * Each entry with a panel beside it that stays in view while the reference
 * scrolls — Deepgram's and Stripe's layout: a channel's session at a glance,
 * or a REST operation's examples. Below the `lg` breakpoint there is no room
 * beside: a REST operation's panel follows the entry, and a channel's session
 * comes first, collapsed, since after the whole reference it would be
 * thousands of pixels down.
 *
 * `after` is the page's own content for the end of the reference column: for
 * a channel, how the connection closes.
 */
function Entries({
  only,
  handshakeExtras,
  after,
}: {
  only?: string;
  handshakeExtras?: ReactNode;
  after?: ReactNode;
}): ReactNode {
  const entries = useEntries().filter(
    (entry) => only === undefined || entrySlug(entry) === only,
  );
  const brokenLinks = useBrokenLinks();
  for (const entry of entries)
    for (const anchor of anchorsOf(entry)) brokenLinks.collectAnchor(anchor);
  return (
    <>
      {entries.map((entry) => {
        // An entry with nothing for its panel has none, and its reference takes the width.
        const panel =
          entry.kind === "channel"
            ? hasSessionPanel(entry)
            : hasOperationPanel(entry);
        const channel = entry.kind === "channel";
        return (
          <Box key={entrySlug(entry)}>
            {panel && channel && (
              <Box display={{ initial: "block", lg: "none" }} mt="5">
                <SessionPanel entry={entry} collapsed />
              </Box>
            )}
            <Grid
              columns={{
                initial: "1",
                lg: panel ? "minmax(0, 1fr) 380px" : "1",
              }}
              gap="6"
            >
              <Box minWidth="0">
                {/* Level 1: one entry per page, so its heading — title and URL — is the page's. */}
                <Entry
                  entry={entry}
                  level={1}
                  handshakeExtras={handshakeExtras}
                />
                {after}
              </Box>
              {panel && (
                // mt matches the entry section's own top margin, so the two headings line up.
                <Box
                  mt="7"
                  display={
                    channel ? { initial: "none", lg: "block" } : undefined
                  }
                  className={styles.panel}
                >
                  {channel ? (
                    <SessionPanel entry={entry} />
                  ) : (
                    <OperationPanel entry={entry} />
                  )}
                </Box>
              )}
            </Grid>
          </Box>
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
    <SiteSpeculoos ir={ir}>
      <Entries
        {...(entry !== undefined ? { only: entry } : {})}
        handshakeExtras={handshakeExtras}
        after={after}
      />
    </SiteSpeculoos>
  );
}

/** An entry's line in the overview: its method or protocol, and its title. */
function EntryLink({ ir, entry }: { ir: ApiIR; entry: ApiEntry }): ReactNode {
  const C = useComponents();
  const url = entryUrl(ir, entry);
  const rest =
    entry.kind === "operation" && entry.operation.kind === "request-response"
      ? entry.operation
      : undefined;
  const title =
    (entry.kind === "operation"
      ? entry.operation.docs.title
      : entry.endpoint.docs.title) ?? entry.endpoint.address;
  return (
    <Flex asChild align="center" gap="2" py="1">
      <li>
        {rest !== undefined ? (
          <C.Badge tone="method" value={rest.method}>
            {rest.method.toUpperCase()}
          </C.Badge>
        ) : (
          <C.Badge tone="protocol" value={entry.endpoint.protocols[0]}>
            {entry.endpoint.protocols[0]?.toUpperCase()}
          </C.Badge>
        )}
        {url === undefined ? (
          title
        ) : (
          <Link asChild>
            <DocusaurusLink to={url}>{title}</DocusaurusLink>
          </Link>
        )}
      </li>
    </Flex>
  );
}

function Overview({ ir }: { ir: ApiIR }): ReactNode {
  const C = useComponents();
  const entries = useEntries();
  return (
    <>
      {ir.info.description !== undefined && (
        <C.Markdown>{ir.info.description}</C.Markdown>
      )}
      <Heading as="h2" size="6" mt="6" mb="3">
        Endpoints
      </Heading>
      <Box asChild p="0" m="0" style={{ listStyle: "none" }}>
        <ul>
          {entries.map((entry) => (
            <EntryLink key={entrySlug(entry)} ir={ir} entry={entry} />
          ))}
        </ul>
      </Box>
    </>
  );
}

/**
 * An API's overview page: its `info.description`, which the reference pages
 * have no place for, then a link to each of its entries' pages.
 */
export function SpeculoosOverview({ ir }: { ir: ApiIR }): ReactNode {
  return (
    <SiteSpeculoos ir={ir}>
      <Overview ir={ir} />
    </SiteSpeculoos>
  );
}
