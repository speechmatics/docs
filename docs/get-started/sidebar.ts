export default {
  type: "category",
  label: "Get started",
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
      id: "get-started/quickstart",
    },
    {
      type: "doc",
      id: "get-started/authentication",
    },
    {
      type: "category",
      label: "SDKs",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "category",
          label: "Speech to text",
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-python-sdk/tree/main/sdk/rt",
              label: "Python (Real-Time)",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-python-sdk/tree/main/sdk/batch",
              label: "Python (Batch)",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-js-sdk/tree/main/packages/real-time-client",
              label: "JavaScript (Real-Time)",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-js-sdk/tree/main/packages/batch-client",
              label: "JavaScript (Batch)",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-dotnet",
              label: ".NET (Community)",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-rs",
              label: "Rust (Community)",
            },
          ],
        },
        {
          type: "category",
          label: "Voice agents - flow",
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-python-sdk/tree/main/sdk/flow",
              label: "Python",
            },
            {
              type: "link",
              href: "https://github.com/speechmatics/speechmatics-js-sdk/tree/main/packages/flow-client",
              label: "JavaScript",
            },
          ],
        },
      ],
    },
    {
      type: "link",
      href: "https://speechmatics.featurebase.app/en/changelog",
      label: "Release notes",
    },
    {
      type: "link",
      href: "https://www.speechmatics.com/pricing",
      label: "Pricing",
    },
  ],
} as const;
