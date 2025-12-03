export default {
  type: "category",
  label: "Integrations and SDKs",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      id: "integrations-and-sdks/integrations-and-sdks-overview",
      label: "Overview",
    },
    {
      type: "doc",
      id: "integrations-and-sdks/integrations-and-sdks-vapi",
      label: "Vapi",
    },
    {
      type: "doc",
      id: "integrations-and-sdks/integrations-and-sdks-livekit",
      label: "LiveKit",
    },
    {
      type: "doc",
      id: "integrations-and-sdks/integrations-and-sdks-pipecat",
      label: "Pipecat",
    },
    {
    type: "category",
    label: "SDKs",
    collapsible: true,
    collapsed: true,
    items: [
    {
        type: "doc",
        id: "integrations-and-sdks/sdks/index",
        label: "Overview",
      },
      {
        type: "doc",
        id: "integrations-and-sdks/sdks/stt-sdk/index",
        label: "Speech to text SDKs",
      },
      {
        type: "doc",
        id: "integrations-and-sdks/sdks/tts-sdk/tts-sdk",
        label: "Text to speech SDK",
      },
       {
        type: "doc",
        id: "integrations-and-sdks/sdks/voice-sdk/voice-sdk",
        label: "Voice SDKs",
      },
    ],
  },
]
}