export default {
  type: "category",
  label: "Administration",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      label: "Accounts",
      id: "administration/accounts",
    },
    {
      type: "category",
      label: "Workspaces",
      items: [
        {
          type: "doc",
          label: "Workspaces concepts",
          id: "administration/workspaces-concepts",
        },
        {
          type: "doc",
          label: "Manage members",
          id: "administration/manage-members",
        },
        {
          type: "doc",
          label: "Domain verification",
          id: "administration/domain-verification",
        },
        {
          type: "doc",
          label: "Single sign-on (SSO)",
          id: "administration/sso",
        },
      ],
    },
    {
      type: "doc",
      label: "Projects",
      id: "administration/projects",
    },
    {
      type: "doc",
      label: "API keys",
      id: "administration/api-keys",
    },
    {
      type: "doc",
      label: "Management tokens",
      id: "administration/management-tokens",
    },
    {
      type: "doc",
      label: "Billing",
      id: "administration/billing",
    },
    {
      type: "doc",
      label: "Plans",
      id: "administration/plans",
    },
    {
      type: "doc",
      label: "Usage",
      id: "administration/usage",
    },
    {
      type: "doc",
      label: "Regions",
      id: "administration/regions",
    },
    {
      type: "doc",
      label: "Security and compliance",
      id: "administration/security-and-compliance",
    },
  ],
} as const;
