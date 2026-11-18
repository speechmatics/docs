import containerSidebar from "./container/sidebar";
import kubernetesSidebar from "./kubernetes/sidebar";
import onDeviceSidebar from "./on-device/sidebar";
import usageReportingSidebar from "./usage-reporting/sidebar";
import virtualApplianceSidebar from "./virtual-appliance/sidebar";

export default {
  type: "category",
  label: "Deployments",
  collapsible: false,
  collapsed: false,
  items: [
    {
      type: "doc",
      label: "Overview",
      id: "deployments/index",
    },
    containerSidebar,
    virtualApplianceSidebar,
    kubernetesSidebar,
    onDeviceSidebar,
    usageReportingSidebar,
  ],
} as const;
