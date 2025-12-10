import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { Flex, Heading as RadixHeading, Text } from "@radix-ui/themes";
import Heading from "@theme/Heading";
import type { Props } from "@theme/MDXComponents/Heading";
import React, { type ReactNode } from "react";

export default function MDXHeading(props: Props): ReactNode {
  const size = getSize(props.as);
  const doc = useDoc();
  const desc = props.as === "h1" ? doc.metadata.description : undefined;

  return (
    <Flex direction="column" gap="2">
      <Flex
        width="100%"
        justify="between"
        align="center"
        direction={{ initial: "column", sm: "row" }}
      >
        <RadixHeading asChild size={size} mt="5" mb={desc ? "0" : "5"}>
          <Heading {...props} />
        </RadixHeading>
      </Flex>
      {desc && (
        <Text size="3" color="gray" mb="5">
          {desc}
        </Text>
      )}
    </Flex>
  );
}

function getSize(as: Props["as"]) {
  switch (as) {
    case "h1":
      return "8";
    case "h2":
      return "6";
    case "h3":
      return "5";
    case "h4":
      return "4";
    case "h5":
      return "3";
    case "h6":
      return "2";
    default:
      throw new Error(`Unknown heading size: ${as}`);
  }
}
