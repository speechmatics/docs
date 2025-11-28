import livekitSidebar from "./livekit/sidebar";
import pipecatSidebar from "./pipecat/sidebar";

export default {
  type: "category",
  label: "Integrations",
  collapsible: false,
  collapsed: false,
  link: {
    type: "generated-index",
  },
  items: [
    {
      type: "doc",
      label: "Overview",
      id: "integrations/overview",
    },
    {
      type: "doc",
      label: "Vapi",
      id: "integrations/vapi/vapi",
    },
    livekitSidebar,
    pipecatSidebar,
  ],
} as const;