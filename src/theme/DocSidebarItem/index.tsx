import type { Props } from "@theme/DocSidebarItem";
import DocSidebarItemCategory from "@theme/DocSidebarItem/Category";
import DocSidebarItemHtml from "@theme/DocSidebarItem/Html";
import DocSidebarItemLink from "@theme/DocSidebarItem/Link";
import React, { type ReactNode } from "react";

export default function DocSidebarItem({ item, ...props }: Props): ReactNode {
  console.log(item, props);
  switch (item.type) {
    case "category":
      return <DocSidebarItemCategory item={item} {...props} />;
    case "html":
      return <DocSidebarItemHtml item={item} {...props} />;
    case "link":
      return <DocSidebarItemLink item={item} {...props} />;
    default:
      item satisfies never;
      throw new Error(`Unknown item type: ${item}`);
  }
}
