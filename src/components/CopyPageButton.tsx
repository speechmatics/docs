import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Button, Spinner, Tooltip } from "@radix-ui/themes";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

export function CopyPageButton() {
  const isIndexPage = useDoc().metadata.id.includes("index");
  const [copyState, setCopyState] = useState<"copy" | "pending" | "copied">(
    "copy",
  );

  const textRef = useRef("");

  // Preload markdown content on load
  useEffect(() => {
    const location = window.location.href;
    const markdownURL = isIndexPage ? `${location}/index.md` : `${location}.md`;
    fetch(markdownURL).then((response) => {
      response.text().then((text) => {
        textRef.current = text;
      });
    });
  }, [isIndexPage]);

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

  return (
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
  );
}
