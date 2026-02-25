import livekitSidebar from "./livekit/sidebar";
import pipecatSidebar from "./pipecat/sidebar";

export default {
  type: "category",
  label: "Integrations and SDKs",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      id: "integrations-and-sdks/index",
      label: "Overview",
    },
    {
      type: "doc",
      id: "integrations-and-sdks/vapi",
      label: "Vapi",
    },
    livekitSidebar,
    pipecatSidebar,
    {
      type: "doc",
      id: "integrations-and-sdks/sdks",
      label: "SDKs",
    },
  ],
} as const;