export default {
  type: "category",
  label: "Integrations",
  collapsible: false,
  collapsed: false,
  link: {
    type: "generated-index",
  },
  items: [
{
  type: "doc",
  label: "Overview",
  id: "integrations/integrations-overview",
},
{
  type: "doc",
  label: "LiveKit",
  id: "integrations/integrations-livekit",
},
{
  type: "doc",
  label: "Pipecat",
  id: "integrations/integrations-pipecat",
},
{
  type: "doc",
  label: "Vapi",
  id: "integrations/integrations-vapi",
},  
  ],
} as const;
