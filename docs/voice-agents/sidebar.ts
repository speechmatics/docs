import voiceAgentsFlowSidebar from "./voice-agents-flow/sidebar";
export default {
  type: "category",
  label: "Voice agents",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      id: "voice-agents/overview",
      label: "Overview",
    },
    {
      type: "doc",
      id: "voice-agents/features",
      label: "Features",
    },
    voiceAgentsFlowSidebar,
  ],
} as const;