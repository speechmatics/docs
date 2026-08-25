export default {
  type: "category",
  label: "Streaming transcription",
  items: [
    {
      type: "doc",
      id: "speech-to-text/streaming/quickstart",
    },
    {
      // Anchor link: sidebar hrefs are not checked by onBrokenLinks, so the
      // target is verified against the built HTML instead.
      type: "link",
      href: "/speech-to-text/models#streaming-models",
      label: "Choosing a model",
    },
    {
      type: "doc",
      id: "speech-to-text/streaming/input",
    },
    {
      type: "doc",
      id: "speech-to-text/streaming/output",
    },
    {
      type: "doc",
      id: "speech-to-text/streaming/limits",
    },
    {
      type: "doc",
      id: "speech-to-text/streaming/channels",
    },
    {
      type: "doc",
      id: "speech-to-text/streaming/ffmpeg-audio",
    },
    {
      type: "link",
      label: "API reference",
      href: "/api-ref/realtime-transcription-websocket",
    },
  ],
} as const;
