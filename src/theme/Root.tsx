import { Theme } from "@radix-ui/themes";
import MixpanelProvider from "@site/src/components/MixpanelProvider";
import React from "react";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <Theme accentColor="cyan">
      <MixpanelProvider>{children}</MixpanelProvider>
    </Theme>
  );
}
