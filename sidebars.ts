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
      ],
    },
  ],
  apiRef: apiRefSidebar,
};
