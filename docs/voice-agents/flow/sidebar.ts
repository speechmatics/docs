export default {
  type: "category",
  label: "Flow",
  collapsible: true,
  collapsed: true,
  items: [
    {
      type: "doc",
      label: "Overview",
      id: "voice-agents/flow/index",
    },
    {
      type: "category",
      label:"Features",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "voice-agents/flow/features/application-inputs",
        },
        {
          type: "doc",
          id: "voice-agents/flow/features/function-calling",
        },
        {
          type: "doc",
          id: "voice-agents/flow/features/webrtc-livekit",
        },
      ],
    },
    {
      type: "category",
      label:"Guides",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "voice-agents/flow/guides/nextjs-guide",
        },
        {
          type: "doc",
          id: "voice-agents/flow/guides/react-native",
        },
      ],
    },
    {
      type: "doc",
      id: "voice-agents/flow/setup",
    },
    {
      type: "doc",
      id: "voice-agents/flow/supported-formats-and-limits",
    },
    {
      type: "doc",
      id: "voice-agents/flow/supported-languages",
    },
    ],
} as const;