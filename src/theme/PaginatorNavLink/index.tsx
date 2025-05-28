import Link from "@docusaurus/Link";
import { Card, Flex, Text } from "@radix-ui/themes";
import type { Props } from "@theme/PaginatorNavLink";
import React, { type ReactNode } from "react";
import styles from "./index.module.css";

export default function PaginatorNavLink(props: Props): ReactNode {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Card asChild style={isNext ? { gridColumn: "2/3" } : undefined}>
      <Link to={permalink}>
        <Flex direction="column" align={isNext ? "end" : "start"} gap="1">
          {subLabel && (
            <Text
              weight="medium"
              className={isNext ? styles.cardLabelNext : styles.cardLabelPrev}
            >
              {subLabel}
            </Text>
          )}
          <Text color="gray">{title}</Text>
        </Flex>
      </Link>
    </Card>
  );
}
