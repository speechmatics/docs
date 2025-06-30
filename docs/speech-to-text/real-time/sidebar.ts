export default {
  type: "category",
  label: "Real-Time Transcription",
  items: [
    {
      type: "doc",
      id: "speech-to-text/real-time/index",
      label: "Overview",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/quickstart",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/supported-formats-and-limits",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/latency",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/end-of-turn",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/using-ffmpeg",
    },
    {
      type: "doc",
      id: "speech-to-text/real-time/using-microphone",
    },
    {
      type: "link",
      label: "API Reference",
      href: "/api-ref/realtime-transcription-websocket",
    },
  ],
} as const;
