import DocusaurusLink from "@docusaurus/Link";
import { Link as RadixLink } from "@radix-ui/themes";
import type { Props } from "@theme/MDXComponents/A";
import React, { type ReactNode } from "react";

export default function MDXA(props: Props): ReactNode {
  return (
    <RadixLink asChild>
      <DocusaurusLink {...props} />
    </RadixLink>
  );
}
