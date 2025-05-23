import type { WrapperProps } from "@docusaurus/types";
import { Link } from "@radix-ui/themes";
import A from "@theme-original/MDXComponents/A";
import type AType from "@theme/MDXComponents/A";
import React, { type ReactNode } from "react";

type Props = WrapperProps<typeof AType>;

export default function AWrapper(props: Props): ReactNode {
  return (
    <Link asChild>
      <A {...props} />
    </Link>
  );
}
