export default [
  {
    type: "category",
    label: "Integrations",
    collapsible: false,
    collapsed: false,
    items: [
      {
        type: "doc",
        id: "integrations/overview",
        label: "Overview",
      },
      {
        type: "doc",
        id: "integrations/livekit",
        label: "LiveKit",
      },
      {
        type: "doc",
        id: "integrations/pipecat",
        label: "Pipecat",
      },
      {
        type: "doc",
        id: "integrations/vapi",
        label: "Vapi",
      }
    ],
  },
] as const;