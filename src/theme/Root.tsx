import { Theme } from "@radix-ui/themes";
import React, { useEffect, useRef, useSyncExternalStore } from "react";
import "@radix-ui/themes/styles.css";

// Default implementation, that you can customize
export default function Root({ children }) {
  return <Theme accentColor="cyan">{children}</Theme>;
}
