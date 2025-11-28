export default [
  {
    type: "category",
    label: "Integrations",
    collapsible: false,
    collapsed: false,
    items: [
      {
        type: "doc",
        id: "integrations/index",
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
            id: "integrations/livekit",
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
        type: "category",
        label: "Pipecat",
        collapsible: true,
        collapsed: true,
        items: [
          {
            type: "doc",
            id: "integrations/pipecat",
            label: "Pipecat",
          },
          {
            type: "doc",
            id: "integrations/pipecat/speechmatics-stt-plugin-guide",
            label: "Speechmatics STT Plugin Guide",
          }
        ]
      },
      {
        type: "category",
        label: "Vapi",
        collapsible: true,
        collapsed: true,
        items: [
          {
            type: "doc",
            id: "integrations/vapi",
            label: "Vapi",
          },
          {
            type: "doc",
            id: "integrations/vapi/speechmatics-stt-plugin-guide",
            label: "Speechmatics STT Plugin Guide",
          }
        ]
      },
    ],
  },
] as const;