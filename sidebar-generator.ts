import type {
  NormalizedSidebarItem,
  SidebarItemsGeneratorOption,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  // Example: return an hardcoded list of static sidebar items
  const defaults = await defaultSidebarItemsGenerator(args);
  const index = defaults.shift();

  if (index.type !== "doc" || index.id !== "index") {
    throw new Error(
      "Index should be the first '.md' item in the `/docs` directory"
    );
  }

  return defaults.map((category, i) => {
    if (category.type !== "category") {
      throw new Error("Category must be the second item in the sidebar");
    }

    const normalizedCategory = withNormalizedLabel(category);

    return {
      ...normalizedCategory,
      // Top level categories are not collapsible
      collapsed: false,
      collapsible: false,
      items:
        i === 0
          ? [index, ...normalizedCategory.items]
          : normalizedCategory.items,
    };
  });
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
