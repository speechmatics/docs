export default {
  type: "category",
  label: "On-device",
  collapsible: true,
  collapsed: true,
  items: [
    {
      type: "doc",
      label: "Overview",
      id: "deployments/on-device/index",
    },
    {
      type: "doc",
      label: "Quickstart",
      id: "deployments/on-device/quickstart",
    },
    {
      type: "doc",
      label: "License",
      id: "deployments/on-device/license",
    },
    {
      type: "doc",
      label: "Build the examples",
      id: "deployments/on-device/build-the-examples",
    },
    {
      type: "doc",
      label: "CMake projects",
      id: "deployments/on-device/cmake",
    },
    {
      type: "category",
      label: "GPU",
      collapsible: true,
      collapsed: true,
      link: { type: "doc", id: "deployments/on-device/gpu/index" },
      items: [
        {
          type: "doc",
          label: "DirectML",
          id: "deployments/on-device/gpu/directml",
        },
        {
          type: "doc",
          label: "CoreML",
          id: "deployments/on-device/gpu/coreml",
        },
      ],
    },
    {
      type: "doc",
      label: "Reference app options",
      id: "deployments/on-device/reference-app-options",
    },
  ],
} as const;
