export default {
  type: "category",
  label: "Integrations",
  collapsible: false,
  collapsed: false,
  link: {
    type: "generated-index",
  },
  items: [
    // docs/integrations/sidebar.ts
    {
  type: "doc",
  label: "Overview",
  id: "integrations/integrations-overview",
},
{
  type: "doc",
  label: "Vapi",
  id: "integrations/vapi/integrations-vapi-vapi",
},
  ],
} as const;