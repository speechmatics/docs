import type {
  NormalizedSidebarItem,
  SidebarItemsGeneratorOption,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const defaults = await defaultSidebarItemsGenerator(args);

  // We assume index.md is the first and only doc item at the top level
  // We're relying a bit on the default ordering in Docusaurus, but we'll just throw an error if it's not the case
  const index = defaults.shift();
  if (index.type !== "doc" || index.id !== "index") {
    throw new Error(
      "'index.md' should be the first and only '.md' item in the top level of the 'docs/' directory",
    );
  }

  console.log(defaults[1]);

  return (
    defaults
      // Remove the Developer Resources category, configure that one manually to allow for external links
      .filter((item) => item.type === "category")
      .filter((item) => item.label !== "developer-resources")
      .toSorted((a, b) => {
        const aIndex = topLevelCategories.indexOf(a.label);
        const bIndex = topLevelCategories.indexOf(b.label);
        return aIndex - bIndex;
      })
      .map((category, i) => {
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
      })
  );
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

const topLevelCategories = [
  "getting-started",
  "speech-to-text",
  "voice-agents-flow",
  "deployments",
  "developer-resources",
];
