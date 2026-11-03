import { translate } from "@docusaurus/Translate";
import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import { Tooltip } from "@radix-ui/themes";
import Button from "@theme/CodeBlock/Buttons/Button";
import type { Props } from "@theme/CodeBlock/Buttons/CopyButton";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";

function title(isCopied: boolean) {
  return isCopied
    ? translate({
        id: "theme.CodeBlock.copied",
        message: "Copied",
        description: "The copied button label on code blocks",
      })
    : translate({
        id: "theme.CodeBlock.copy",
        message: "Copy",
        description: "The copy button label on code blocks",
      });
}

function ariaLabel(isCopied: boolean) {
  return isCopied
    ? title(true)
    : translate({
        id: "theme.CodeBlock.copyButtonAriaLabel",
        message: "Copy code to clipboard",
        description: "The ARIA label for copy code blocks button",
      });
}

function useCopyButton() {
  const {
    metadata: { code },
  } = useCodeBlockContext();
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return { copyCode, isCopied };
}

export default function CopyButton({ className }: Props): ReactNode {
  const { copyCode, isCopied } = useCopyButton();
  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Tooltip content={title(isCopied)}>
      <Button
        aria-label={ariaLabel(isCopied)}
        className={className}
        onClick={copyCode}
      >
        <Icon
          size={16}
          aria-hidden="true"
          color={isCopied ? "var(--green-11)" : undefined}
        />
      </Button>
    </Tooltip>
  );
}
