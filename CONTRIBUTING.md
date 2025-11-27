# Contributing

We welcome contributions to the docs. Please file an issue, or open a PR if you find something that needs to be fixed or improved.

## Speechmatics org. members

Open a pull request to the `main` branch. The CI pipeline will build and deploy the docs to Vercel.

## Other contributors

Fork this repository, and open a PR against the `main` branch. Note that this will *not* create a preview link.

### Forking

1. Navigate to the repository on GitHub
2. Click the "Fork" button in the top right corner of the repository page
3. Confirm your fork - this will be your own copy of the repository in your github account
4. Clone your fork to your local machine
5. Add the upstream repository as a remote to your local repository, and fetch upstream changes
6. Create a new branch 
7. Make your changes and git push to your fork
8. Open a PR against the `main` branch

### Creating a PR

1. Navigate to the repository on GitHub
2. Click the "New pull request" button in the top right corner of the repository page
3. Select the `main` branch as the base branch and your fork as the compare branch
4. Fill in the PR title and description
5. Click "Create pull request"
6. Wait for the CI pipeline to run
7. If the CI pipeline fails, fix the issues and push to your fork
8. If the CI pipeline passes, the PR will be reviewed, and merged into the `main` branch if approved.

## Style guide

Please refer to the [style guide](https://github.com/speechmatics/docs/blob/main/.windsurf/rules/docs-style-guide.md) for information on writing standards, style and tone of voice. If you're using Windsurf, these rules should be taken into account automatically.

## Project structure

This site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## URLs and redirects

When changing the URL of a page, you need to take some steps to avoid broken links

1. Update the `/scripts/redirects.json` file with the `source` and `target` URLs
2. Run `npm run sync-redirects` to update `vercel.json`.
3. Commit the changes to `vercel.json` and `scripts/redirects/redirects.json`.
4. Update any pages which link to the old URL (CI pipeline should fail with an exhaustive list if any are found)

### Content

The pages for the site are located in the `/docs` directory. Sidebars are configured using the `sidebar.ts` files located in the respective sections.

### Custom UI

Custom UI components are found under the `src/theme` directory. This includes components which are ["Swizzled"](https://docusaurus.io/docs/swizzling) from the defaults.

Custom CSS is organised in the `src/css` folder. Files in this directory are imported into the root `src/css/custom.css` file for global style overrides. This allows us to integrate [Radix Themes](https://www.radix-ui.com/) as a design system while still using Docusaurus's default layout.
