import { Theme } from "@radix-ui/themes";
import React from "react";
import MixpanelProvider from "@site/src/components/MixpanelProvider";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <Theme accentColor="cyan">
      <MixpanelProvider>
        {children}
      </MixpanelProvider>
    </Theme>
  );
}
