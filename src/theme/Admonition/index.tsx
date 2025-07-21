import { processAdmonitionProps } from "@docusaurus/theme-common";
import { Box, Callout, Flex, Text } from "@radix-ui/themes";
import type { Props } from "@theme/Admonition";
import {
  BellIcon,
  FlameIcon,
  InfoIcon,
  LightbulbIcon,
  PinIcon,
} from "lucide-react";
import React, { type ReactNode } from "react";
import styles from "./index.module.css";

const admonitionMap = {
  note: { icon: PinIcon, color: "gray" },
  info: { icon: InfoIcon, color: "cyan" },
  warning: { icon: BellIcon, color: "yellow" },
  danger: { icon: FlameIcon, color: "red" },
  tip: { icon: LightbulbIcon, color: "green" },
};

export default function Admonition(unprocessedProps: Props): ReactNode {
  const props = processAdmonitionProps(unprocessedProps);

  const Icon = admonitionMap[props.type].icon;
  const color = admonitionMap[props.type].color;

  return (
    <Box asChild mb="3">
      <Callout.Root
        variant="surface"
        color={color}
        size="2"
        className={styles.admonition}
      >
        <Callout.Icon>
          <Box asChild width="100%" height="100%">
            <Icon />
          </Box>
        </Callout.Icon>
        <Text size="2" as="span">
          {props.children}
        </Text>
      </Callout.Root>
    </Box>
  );
}
