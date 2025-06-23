import {
  type TabItemProps,
  sanitizeTabsChildren,
  useTabs,
} from "@docusaurus/theme-common/internal";
import { Box, Tabs as RadixTabs } from "@radix-ui/themes";
import type { Props } from "@theme/Tabs";
import clsx from "clsx";
import React, { cloneElement, type ReactElement, type ReactNode } from "react";

function TabContent({
  lazy,
  children,
  selectedValue,
}: Props & ReturnType<typeof useTabs>) {
  const childTabs = (Array.isArray(children) ? children : [children]).filter(
    Boolean,
  ) as ReactElement<TabItemProps>[];
  if (lazy) {
    const selectedTabItem = childTabs.find(
      (tabItem) => tabItem.props.value === selectedValue,
    );
    if (!selectedTabItem) {
      // fail-safe or fail-fast? not sure what's best here
      return null;
    }
    return cloneElement(selectedTabItem, {
      className: clsx("margin-top--md", selectedTabItem.props.className),
    });
  }
  return (
    <Box my="4">
      {childTabs.map((tabItem, i) =>
        cloneElement(tabItem, {
          key: tabItem.props.value,
          hidden: tabItem.props.value !== selectedValue,
        }),
      )}
    </Box>
  );
}

function TabsComponent(props: Props): ReactNode {
  const tabs = useTabs(props);
  return (
    <RadixTabs.Root
      defaultValue={props.defaultValue}
      value={tabs.selectedValue}
      onValueChange={tabs.selectValue}
    >
      <RadixTabs.List>
        {sanitizeTabsChildren(props.children).map((child) => (
          <RadixTabs.Trigger key={child.props.value} value={child.props.value}>
            {child.props.label ?? child.props.value}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      <RadixTabs.Content value={tabs.selectedValue}>
        <TabContent {...tabs} {...props} />
      </RadixTabs.Content>
    </RadixTabs.Root>
  );
}

export default function Tabs(props: Props): ReactNode {
  return (
    <TabsComponent {...props}>
      {sanitizeTabsChildren(props.children)}
    </TabsComponent>
  );
}
