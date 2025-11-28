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
        type: "category",
        label: "LiveKit",
        collapsible: true,
        collapsed: true,
        items: [
          {
            type: "doc",
            id: "integrations/livekit/livekit",  // Note the full path
            label: "LiveKit",
          },
          {
            type: "doc",
            id: "integrations/livekit/speechmatics-stt-plugin-guide",
            label: "Speechmatics STT Plugin Guide",
          }
        ]
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