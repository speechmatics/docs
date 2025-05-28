import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";
import { Slot } from "@radix-ui/themes";
import clsx from "clsx";
import React, { type ComponentProps, type ReactNode } from "react";
import styles from "./styles.module.css";

export default function CodeBlockContainer({
  asChild,
  ...props
}: { asChild?: true } & ComponentProps<"div">): ReactNode {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      style={prismCssVariables}
      className={clsx(
        props.className,
        styles.codeBlockContainer,
        ThemeClassNames.common.codeBlock,
      )}
    />
  );
}
