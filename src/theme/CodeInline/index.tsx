import { Code } from "@radix-ui/themes";
import type { Props } from "@theme/CodeInline";
import React, { type ReactNode } from "react";

// Simple component used to render inline code blocks
// its purpose is to be swizzled and customized
// MDX 1 used to have a inlineCode comp, see https://mdxjs.com/migrating/v2/
export default function CodeInline(props: Props): ReactNode {
  return (
    <Code variant="outline" color="gray" asChild>
      {/* Unset the default Docusaurus `code` styles */}
      <code {...props} style={{ border: "unset", verticalAlign: "unset" }} />
    </Code>
  );
}
