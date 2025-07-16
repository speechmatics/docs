import { Heading as RadixHeading } from "@radix-ui/themes";
import Heading from "@theme/Heading";
import type { Props } from "@theme/MDXComponents/Heading";
import React, { type ReactNode } from "react";

export default function MDXHeading(props: Props): ReactNode {
  const size = getSize(props.as);

  return (
    <RadixHeading asChild size={size} mt="5" mb="5">
      <Heading {...props} />
    </RadixHeading>
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
