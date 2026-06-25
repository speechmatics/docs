# Speechmatics docs

This project contains source code and content for the Speechmatics Docs site (docs.speechmatics.com). It documents integrations with Speechmatics APIs, libraries and SDKs, as well as short technical guides and API references.

## Tech stack

Pages are written in MDX and rendered to a static site with Docusaurus, deployed to Vercel.

### Running the site locally

To run the site locally with hot reloading, run:

```
npm run start
```

## Page structure

Pages are stored in the `docs` folder and their URLs are determined by their path: i.e. `/docs/get-started/authentication.mdx` is served at `/get-started/authentication`. Pages called `index.md` or `index.mdx` are rendered at the root of their section, i.e. `/docs/speech-to-text/index.mdx` is served at `/speech-to-text/`. The logic for how pages map to URLs is defined in `docusaurus.config.ts` in the root of the project.

## Sidebars

Sidebar links are defined separately from pages. Adding a page will not automatically add it to a sidebar. Each section in `docs/` has its own `sidebar.ts` file — edit the one in the relevant section directory to include new links.

## Writing style

Rules for writing style are defined in [docs-style-guide.md](docs-style-guide.md). When making edits to text content, please ensure that the changes adhere to these rules.

## Renaming or moving pages

When changing a page's URL, you must add a redirect to avoid broken links:

1. Add the old and new paths to `scripts/redirects/redirects.json`
2. Run `npm run sync-redirects` to update `vercel.json`
3. Commit both files

The CI pipeline checks for broken internal links and will fail with a list of affected pages if any are missed.

## Custom UI

Swizzled Docusaurus components live in `src/theme/`. Custom CSS overrides are in `src/css/`, all imported via `src/css/custom.css`. We use Radix Themes as the design system layered over Docusaurus's default Infima styles.

## Spell checking

The project uses cspell (`cspell.json`) for spell checking. Add new technical terms that aren't in the dictionary to `custom-words.txt`.

## API reference

We generate API reference pages from the YAML files in the `spec/` folder. There are scripts in `package.json` which handle this process. Check there if you need more information on their workings.

## Additional context

The `.claude/context/` folder holds extra Markdown context files on specific topics. Consult the relevant file when working in its area — see `.claude/context/README.md` for the convention and add a "read this when…" pointer here when you add a file.

- `.claude/context/terminology.md` — read before editing or reviewing any page copy; the canonical authority for product naming, capitalization, and word-level style.
- `.claude/context/product-architecture.md` — read when writing or reviewing anything about products, processing modes, models, or packaging; the source of truth for how the product is structured.
- `.claude/context/claude-code-docs-workflow.md` — the working agreement for how to handle docs changes and PR reviews in this repo.
