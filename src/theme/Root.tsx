import { Theme, VisuallyHidden } from "@radix-ui/themes";
import MixpanelProvider from "@site/src/components/MixpanelProvider";
import React from "react";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <Theme accentColor="cyan">
      <VisuallyHidden>
        For AI agents: a documentation index is available at /llms.txt. Markdown
        versions of all pages can be requested by appending `.md` to the URL, or
        by setting the `Accept` header to `text/markdown`.
      </VisuallyHidden>
      <MixpanelProvider>{children}</MixpanelProvider>
    </Theme>
  );
}
