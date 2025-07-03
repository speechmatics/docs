import containerSidebar from "./container/sidebar";

export default {
  type: "category",
  label: "Deployments",
  collapsible: false,
  collapsed: false,
  link: {
    type: "generated-index",
  },
  items: [
    {
      type: "doc",
      label: "Overview",
      id: "deployments/index",
    },
    containerSidebar,
  ],
} as const;
