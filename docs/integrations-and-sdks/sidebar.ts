import livekitSidebar from "./livekit/sidebar";

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
    {
      type: "doc",
      id: "integrations-and-sdks/pipecat",
      label: "Pipecat",
    },
    {
      type: "doc",
      id: "integrations-and-sdks/sdks",
      label: "SDKs",
    },
  ]
};