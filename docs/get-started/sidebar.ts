export default {
  type: "category",
  label: "Get started",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      id: "index",
      label: "Welcome",
    },
    {
      type: "doc",
      id: "get-started/quickstart",
    },
    {
      type: "doc",
      id: "get-started/authentication",
    },
    {
      type: "link",
      href: "https://www.speechmatics.com/pricing",
      label: "Pricing",
    },
  ],
} as const;
