import { translate } from "@docusaurus/Translate";
import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import { Tooltip } from "@radix-ui/themes";
import Button from "@theme/CodeBlock/Buttons/Button";
import type { Props } from "@theme/CodeBlock/Buttons/WordWrapButton";
import { WrapTextIcon } from "lucide-react";
import React, { type ReactNode } from "react";

export default function WordWrapButton({ className }: Props): ReactNode {
  const { wordWrap } = useCodeBlockContext();

  const canShowButton = wordWrap.isEnabled || wordWrap.isCodeScrollable;
  if (!canShowButton) {
    return false;
  }

  const title = translate({
    id: "theme.CodeBlock.wordWrapToggle",
    message: "Toggle word wrap",
    description:
      "The title attribute for toggle word wrapping button of code block lines",
  });

  return (
    <Tooltip content={title}>
      <Button
        onClick={() => wordWrap.toggle()}
        className={className}
        aria-label={title}
        aria-pressed={wordWrap.isEnabled}
      >
        <WrapTextIcon size={16} aria-hidden="true" />
      </Button>
    </Tooltip>
  );
}
