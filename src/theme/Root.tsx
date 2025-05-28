import { Theme } from "@radix-ui/themes";
import React from "react";

// Default implementation, that you can customize
export default function Root({ children }) {
  return <Theme accentColor="cyan">{children}</Theme>;
}
