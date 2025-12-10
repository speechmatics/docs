export default {
  type: "category",
  label: "Get started",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      id: "index",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "get-started/quickstart",
      label: "Quickstart",
    },
    {
      type: "doc",
      id: "get-started/authentication",
    },
    {
      type: "link",
      href: "https://speechmatics.featurebase.app/en/changelog",
      label: "Release notes",
    },
    {
      type: "link",
      href: "https://www.speechmatics.com/pricing",
      label: "Pricing",
    },
  ],
} as const;
