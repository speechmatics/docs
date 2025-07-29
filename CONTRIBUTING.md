# Contributing

We welcome contributions to the docs. Please file an issue, or open a PR if you find something that needs to be fixed or improved.

## Style guide

Please refer to the [style guide][./windsurf/rules/docs-style-guide.md] for information on writing standards, style and tone of voice. If you're using Windsurf, these rules should be taken into account automatically.

## Project structure

This site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Content

The pages for the site are located in the `/docs` directory. Sidebars are configured using the `sidebar.ts` files located in the respective sections.

### Custom UI

Custom UI components are found under the `src/theme` directory. This includes components which are ["Swizzled"](https://docusaurus.io/docs/swizzling) from the defaults.

Custom CSS is organised in the `src/css` folder. Files in this directory are imported into the root `src/css/custom.css` file for global style overrides. This allows us to integrate [Radix Themes](https://www.radix-ui.com/) as a design system while still using Docusaurus's default layout.
