import type {
  NormalizedSidebarItem,
  SidebarItemsGeneratorOption,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const defaults = await defaultSidebarItemsGenerator(args);

  return defaults.map((item) => withNormalizedLabel(item));
};

// Capitalize the first letter of each word in the label, and replace hyphens with spaces
// (this already happens automatically for 'doc' items, but not for intermediate categories)
function withNormalizedLabel(item: NormalizedSidebarItem) {
  if (item.type === "category") {
    const normalizedLabel = item.label
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      // TODO at the moment categories at level 2 auto-expand, and anything deeper doesn't
      // This seems reasonable, but if we want to change it, we can do it here
      ...item,
      label: normalizedLabel,
      items: item.items.map(withNormalizedLabel),
    };
  }
  return item;
}
