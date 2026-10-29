import { Code } from "@radix-ui/themes";
import type { Props } from "@theme/CodeInline";
import React, { type ReactNode } from "react";

// Simple component used to render inline code blocks
// its purpose is to be swizzled and customized
// MDX 1 used to have a inlineCode comp, see https://mdxjs.com/migrating/v2/
export default function CodeInline(props: Props): ReactNode {
  return (
    <Code asChild color="gray" highContrast>
      {/* Infima's leftover `code` styles are unset for every .rt-Code in reset.css */}
      <code {...props} />
    </Code>
  );
}
