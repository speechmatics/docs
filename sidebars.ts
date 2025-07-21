import apiRefSidebar from "./docs/api-ref/sidebar";
import deploymentsSidebar from "./docs/deployments/sidebar";
import gettingStartedSidebar from "./docs/get-started/sidebar";
import speechToTextSidebar from "./docs/speech-to-text/sidebar";
import voiceAgentsFlowSidebar from "./docs/voice-agents-flow/sidebar";

export default {
  docs: [
    gettingStartedSidebar,
    speechToTextSidebar,
    voiceAgentsFlowSidebar,
    deploymentsSidebar,
    {
      type: "category",
      label: "Developer Resources",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "link",
          href: "https://github.com/speechmatics",
          label: "GitHub",
        },
        {
          type: "link",
          href: "https://status.speechmatics.com",
          label: "Status",
        },
        {
          type: "link",
          label: "Support",
          href: "https://support.speechmatics.com/hc/en-gb",
        },
        {
          type: "link",
          label: "Feature request",
          href: "https://github.com/orgs/speechmatics/discussions/new?category=ideas-suggestions",
        },
        {
          type: "link",
          label: "Blog",
          href: "https://blog.speechmatics.com",
        },
        {
          type: "link",
          label: "Website",
          href: "https://speechmatics.com",
        },
      ],
    },
  ],
  apiRef: apiRefSidebar,
};
