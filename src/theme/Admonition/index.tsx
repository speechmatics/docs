import { processAdmonitionProps } from "@docusaurus/theme-common";
import { Box, Callout, Flex, Text } from "@radix-ui/themes";
import type { Props } from "@theme/Admonition";
import { Bell, Flame, Info, Lightbulb, Pin } from "lucide-react";
import React, { type ReactNode } from "react";
import styles from "./index.module.css";

const admonitionMap = {
  note: { icon: Pin, color: "gray" },
  info: { icon: Info, color: "cyan" },
  warning: { icon: Bell, color: "yellow" },
  danger: { icon: Flame, color: "red" },
  tip: { icon: Lightbulb, color: "green" },
};

export default function Admonition(unprocessedProps: Props): ReactNode {
  const props = processAdmonitionProps(unprocessedProps);

  const Icon = admonitionMap[props.type].icon;
  const color = admonitionMap[props.type].color;

  return (
    <Box asChild mb="3" minWidth="0">
      <Callout.Root
        variant="outline"
        color={color}
        size="2"
        className={styles.admonition}
      >
        <Callout.Icon>
          <Box asChild width="100%" height="100%">
            <Icon />
          </Box>
        </Callout.Icon>
        <Text size="2" as="span" style={{ minWidth: 0 }}>
          {props.children}
        </Text>
      </Callout.Root>
    </Box>
  );
}
