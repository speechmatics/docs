import { processAdmonitionProps } from "@docusaurus/theme-common";
import { Box, Callout, Flex, Text } from "@radix-ui/themes";
import type { Props } from "@theme/Admonition";
import {
  AlertTriangleIcon,
  CircleAlertIcon,
  InfoIcon,
  LightbulbIcon,
} from "lucide-react";
import React, { type ReactNode } from "react";
import styles from "./index.module.css";

const admonitionMap = {
  note: { icon: InfoIcon, color: "gray" },
  info: { icon: InfoIcon, color: "blue" },
  warning: { icon: AlertTriangleIcon, color: "orange" },
  danger: { icon: CircleAlertIcon, color: "red" },
  tip: { icon: LightbulbIcon, color: "green" },
};

export default function Admonition(unprocessedProps: Props): ReactNode {
  const props = processAdmonitionProps(unprocessedProps);

  const Icon = admonitionMap[props.type].icon;
  const color = admonitionMap[props.type].color;

  return (
    <Box asChild mb="3">
      <Callout.Root color={color} size="2" className={styles.admonition}>
        <Flex gap="2" align="center">
          <Callout.Icon>
            <Icon />
          </Callout.Icon>
          <Text weight="bold">{props.type.toUpperCase()}</Text>
        </Flex>
        {props.children}
      </Callout.Root>
    </Box>
  );
}
