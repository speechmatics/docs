import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  Button,
  DropdownMenu,
  Flex,
  Link,
  Spinner,
  Tooltip,
} from "@radix-ui/themes";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import styles from "./CopyPageButton.module.css";

export function CopyPageButton() {
  const doc = useDoc();
  const pageId = doc.metadata.id;
  const isIndexPage = pageId.includes("index");
  const [copyState, setCopyState] = useState<"copy" | "pending" | "copied">(
    "copy",
  );

  const textRef = useRef("");

  const permalink = doc.metadata.permalink;

  const markdownURL = isIndexPage
    ? `${permalink.replace(/\/$/, "")}/index.md`
    : `${permalink}.md`;

  // Preload markdown content on load
  useEffect(() => {
    fetch(markdownURL).then((response) => {
      response.text().then((text) => {
        textRef.current = text;
      });
    });
  }, [markdownURL]);

  const copy = useCallback(async () => {
    try {
      setCopyState("pending");
      await navigator.clipboard.writeText(textRef.current);
      setCopyState("copied");
    } finally {
      setTimeout(() => {
        setCopyState("copy");
      }, 2000);
    }
  }, []);

  const llmPropmt = encodeURIComponent(
    `Analyze this documentation: https://docs.speechmatics.com${markdownURL}`,
  );

  return (
    <Flex className={styles.copyButton}>
      <Tooltip content="Copy page as Markdown">
        <Button variant="outline" color="gray" onClick={copy}>
          {copyState === "copied" ? (
            <CheckIcon size={16} />
          ) : copyState === "pending" ? (
            <Spinner />
          ) : (
            <CopyIcon size={16} />
          )}
          {copyState === "copied" ? "Copied!" : "Copy page"}
        </Button>
      </Tooltip>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" color="gray">
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={copy}>Copy Markdown</DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href={markdownURL} target="_blank" rel="noreferrer">
              View Markdown in new tab
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item asChild>
            <a
              href={`https://chat.openai.com/?hints=search&prompt=${llmPropmt}`}
              target="_blank"
              rel="noreferrer"
            >
              Reference in ChatGPT
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a
              href={`https://claude.ai/new?q=${llmPropmt}`}
              target="_blank"
              rel="noreferrer"
            >
              Reference in Claude
            </a>
          </DropdownMenu.Item>

          <DropdownMenu.Separator />
          <DropdownMenu.Item asChild>
            <a
              href={`https://github.com/speechmatics/docs/issues/new?title=Issue+with+page:+${doc.contentTitle}`}
              target="_blank"
              rel="noreferrer"
            >
              Report an issue with this page...
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}
