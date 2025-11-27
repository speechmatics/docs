export default {
  type: "category",
  label: "Integrations",
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
      id: "livekit",
      label: "LiveKit",
    },
    {
      type: "doc",
      id: "pipecat",
      label: "Pipecat",
    },
    {
      type: "doc",
      id: "vapi",
      label: "Vapi",
    },
  ],
} as const;