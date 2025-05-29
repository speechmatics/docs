import type { PrismTheme } from "prism-react-renderer";

// This theme is based on Radix colors and works in light and dark mode
export const prismTheme = {
  plain: {
    color: "var(--gray-12)",
    backgroundColor: "var(--gray-2)",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "var(--gray-10)",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "var(--amber-11)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "var(--gray-12)",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "regex",
        "inserted",
        "function",
        "class-name",
      ],
      style: {
        color: "var(--crimson-11)",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "var(--blue-11)",
      },
    },
    {
      types: ["deleted", "tag", "property"],
      style: {
        color: "var(--cyan-11)",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "var(--purple-11)",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "var(--blue-11)",
      },
    },
  ],
} satisfies PrismTheme;
