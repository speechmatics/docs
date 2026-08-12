export default {
  type: "category",
  label: "Pre-recorded transcription",
  items: [
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/quickstart",
    },
    {
      // Anchor link: sidebar hrefs are not checked by onBrokenLinks, so the
      // target is verified against the built HTML instead.
      type: "link",
      href: "/speech-to-text/models#pre-recorded-models",
      label: "Choosing a model",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/input",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/output",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/synchronous",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/limits",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/notifications",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/language-identification",
    },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/srt-format",
    },
    // TODO see about usage requests
    // {
    //   type: "doc",
    //   id: "speech-to-text/pre-recorded/usage-requests",
    // },
    {
      type: "doc",
      id: "speech-to-text/pre-recorded/troubleshooting",
    },
    {
      type: "link",
      href: "/api-ref/batch/create-a-new-job",
      label: "API reference",
    },
  ],
} as const;
