import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import type { Props } from "@theme/DocRoot/Layout/Main";
import clsx from "clsx";
import React, { type ReactNode } from "react";

import { Box, Card, Flex } from "@radix-ui/themes";
import styles from "./styles.module.css";

export default function DocRootLayoutMain({ children }: Props): ReactNode {
  return (
    <Flex
      asChild
      p="5"
      align="start"
      width="100%"
      className={styles.pageContainer}
      justify="center"
    >
      <main>
        <Box maxWidth="1000px" minWidth="0">
          {children}
        </Box>
      </main>
    </Flex>
  );
}
