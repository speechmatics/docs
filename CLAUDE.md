# Speechmatics docs

This repository contains the source code and content for the Speechmatics Docs site (docs.speechmatics.com). It documents integrations with Speechmatics APIs, libraries and SDKs, as well as short technical guides and API references. Use it both to work on the site and to create or review documentation content.

To start (content tasks): paste your notes, rough draft, or brief. The assistant proposes a plan before writing unless you ask it to write immediately.

## Project files

docs-style-guide.md — writing standards, content types, and governance
.CLAUDE/context/terminology.md — canonical product names, preferred terms, and terms to avoid
.CLAUDE/context/product-architecture.md — STT and TTS product structure for accuracy checks

## Tech stack

Pages are written in MDX and rendered to a static site with Docusaurus, deployed to Vercel.

## Running the site locally

To run the site locally with hot reloading, run:

```
npm run start
```

## Page structure

Pages are stored in the docs folder and their URLs are determined by their path: i.e. `/docs/get-started/authentication.mdx` is served at `/get-started/authentication`. Pages called `index.md` or `index.mdx` are rendered at the root of their section, i.e. `/docs/speech-to-text/index.mdx` is served at `/speech-to-text/`. The logic for how pages map to URLs is defined in docusaurus.config.ts in the root of the project.

## Sidebars

Sidebar links are defined separately from pages. Adding a page will not automatically add it to a sidebar. Each section in docs/ has its own sidebar.ts file — edit the one in the relevant section directory to include new links.

## Renaming or moving pages

When changing a page's URL, you must add a redirect to avoid broken links:

- Add the old and new paths to scripts/redirects/redirects.json
- Run `npm run sync-redirects` to update `vercel.json`
- Commit both files
- The CI pipeline checks for broken internal links and will fail with a list of affected pages if any are missed.

## Custom UI

Swizzled Docusaurus components live in `src/theme/`. Custom CSS overrides are in `src/css/`, all imported via `src/css/custom.css`. We use Radix Themes as the design system layered over Docusaurus's default Infima styles.

## Spell checking

The project uses cspell (`cspell.json`) for spell checking. Add new technical terms that aren't in the dictionary to `custom-words.txt`.

## API reference

We generate API reference pages from the YAML files in the spec/ folder. There are scripts in package.json which handle this process. Check there if you need more information on their workings.

## Behavioral rules

**Apply the style guide automatically.** Every document produced follows [docs-style-guide.md](docs-style-guide.md): content type, structure, writing principles, content elements, and AI-readability standards. Do not wait to be asked. If source material conflicts with the style guide, flag it and apply the correct standard.
**Check terminology.** Verify every product name, API name, model name, and technical term against terminology.md. Flag deviations in source material before producing output.
**Verify product claims.** Check all statements about Speechmatics products, APIs, and models against product-architecture.md. Do not reproduce claims that conflict with it.
**Atlassian (Confluence and Jira).** Use the Atlassian connection only when the project files do not cover the question, or when a contributor explicitly requests it. When used, always state that the information comes from Confluence or Jira and may be outdated or incorrect. Never present it as authoritative. Project files always take precedence over Atlassian content.
**Default mode — planning.** When given partial input, before writing:1. Identify the Diátaxis content type.2. Propose a structure: title, H2 sections, approximate scope.3. Flag any terminology or style guide issues in the source material.4. Ask for confirmation before proceeding.
**Auto mode.** If the contributor says "just write it", "go ahead", or provides a detailed structured brief, skip planning and produce the document directly.
**Word count discipline.** Produce the minimum words the reader needs to act. Before presenting any output, remove: (1) sentences that restate a heading, (2) sentences that explain a self-evident example, (3) summary or closing lines that recap what was just said.
**Flag violations.** Flag structural problems, wrong content types, terminology errors, and style guide violations. State the issue once clearly, then proceed with the contributor's preference if they choose to override.
