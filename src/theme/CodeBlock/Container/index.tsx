import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";
import { Card, type CardProps } from "@radix-ui/themes";
import clsx from "clsx";
import React, { type ReactNode } from "react";

type Props = Omit<CardProps, "asChild"> & {
  as: "div" | "pre";
};

// Card merges its props, classes and styles onto the child element via
// `asChild`, so the element type never has to be generic over its props.
export default function CodeBlockContainer({
  as: As,
  children,
  className,
  style,
  ...props
}: Props): ReactNode {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);
  return (
    <Card
      asChild
      mb="4"
      {...props}
      style={{ ...prismCssVariables, ...style }}
      className={clsx(className, ThemeClassNames.common.codeBlock)}
    >
      <As>{children}</As>
    </Card>
  );
}
