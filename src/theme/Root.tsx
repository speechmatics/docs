import React from "react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { ThemeProvider } from "next-themes";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <ThemeProvider attribute="class">
      <Theme>{children}</Theme>;
    </ThemeProvider>
  );
}
