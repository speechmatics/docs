import type {
  NormalizedSidebarItem,
  SidebarItemsGeneratorOption,
} from "@docusaurus/plugin-content-docs/src/sidebars/types.js";

// Only include these endpoints in the sidebar, even though more exist in the spec
// TODO: Investigate this requirement. It would be ideal if we could either
// 1. Include all spec endpoints in the site, or
// 2. Remove irrelevant endpoints from the spec
const batchAPIPaths = [
  "/jobs",
  "/jobs/{jobid}",
  "/jobs/{jobid}/transcript",
  "/usage",
];

export const sidebarItemsGenerator: SidebarItemsGeneratorOption = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => {
  const docs = args.docs
    .filter((doc) => {
      if (doc.frontMatter.api_path) {
        return batchAPIPaths.includes(doc.frontMatter.api_path as string);
      }
      // TODO we can also filter schema docs we don't want here.
      if (doc.frontMatter.sidebar_exclude) {
        return false;
      }

      return true;
    })
    .map((doc) => {
      // All index pages should be called "Overview" and be the first item in the sidebar
      if (doc.id.match(/index$/)) {
        const ret = {
          ...doc,
          frontMatter: {
            ...doc.frontMatter,
            sidebar_label: "Overview",
          },
          sidebarPosition: 0,
        };
        return ret;
      }
      return doc;
    });
  const defaults = await defaultSidebarItemsGenerator({ ...args, docs });

  return defaults.map((item) => withNormalizedLabel(item));
};

// Capitalize the first letter of each word in the label, and replace hyphens with spaces
function withNormalizedLabel(item: NormalizedSidebarItem) {
  if (item.type === "category") {
    const normalizedLabel = item.label
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      ...item,
      label: normalizedLabel,
      items: item.items.map(withNormalizedLabel),
    };
  }
  return item;
}
