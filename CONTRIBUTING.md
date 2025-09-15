# Contributing

We welcome contributions to the docs. Please file an issue, or open a PR if you find something that needs to be fixed or improved.

## For Speechmatics employees

Open a pull request to the `main` branch. The CI pipeline will build and deploy the docs to Vercel.

## For external contributors

Fork this repository, and open a PR against the `main` branch. Note that this will *not* create a preview link.

## Style guide

Please refer to the [style guide](https://speechmatics.atlassian.net/wiki/spaces/OCE/pages/4858937507/How+to+contribute+to+the+docs) for information on writing standards, style and tone of voice. If you're using Windsurf, these rules should be taken into account automatically.

## Project structure

This site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Content

The pages for the site are located in the `/docs` directory. Sidebars are configured using the `sidebar.ts` files located in the respective sections.

### Custom UI

Custom UI components are found under the `src/theme` directory. This includes components which are ["Swizzled"](https://docusaurus.io/docs/swizzling) from the defaults.

Custom CSS is organised in the `src/css` folder. Files in this directory are imported into the root `src/css/custom.css` file for global style overrides. This allows us to integrate [Radix Themes](https://www.radix-ui.com/) as a design system while still using Docusaurus's default layout.
