export const smVariables = {
  jsonOutputVersion: "2.9",
  latestApplianceVersion: "6.2.1",
  latestContainerVersion: "13.0.0", // Make sure to manually update docs/on-prem/containers/sm-inference.yaml
  usageContainerVersion: "0.3.0",
  helmChartVersion: "0.7.0",
} as const;

// TODO investigate if there is a better way to handle these version numbers
