# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the official Speechmatics documentation site, built with Docusaurus 3 and deployed to [docs.speechmatics.com](https://docs.speechmatics.com) via Vercel on push to `main`.

## Commands

```bash
npm start              # Start local dev server (also generates Jobs API reference)
npm run build          # Production build
npm run lint           # Run Biome linter
npm run lint:fix       # Auto-fix lint issues
npm run spellcheck     # Run cspell spell checker
npm run typecheck      # TypeScript type checking

# API reference generation
npm run build:jobs-spec       # Generate Batch/Jobs API spec from YAML
npm run build:jobs-api-ref    # Generate full API reference docs

# Redirect management
npm run sync-redirects        # Sync redirects.json → vercel.json
npm run clear                 # Clear Docusaurus build cache
```

Node version: 22.11.0 (see `.nvmrc`). The `MIXPANEL_PROJECT_TOKEN` env var is needed for production builds but optional locally.

## Architecture

**Framework**: Docusaurus 3.9.2 with TypeScript. Content is Markdown/MDX.

**Key configuration files**:
- `docusaurus.config.ts` — site metadata, plugins, navbar/footer, Algolia search
- `sidebars.ts` — imports 8 product-specific sidebar files and composes them
- `sidebar-generator.ts` — custom sidebar generator that filters API endpoints and normalizes labels
- `biome.json` — linter/formatter config (replaces ESLint/Prettier)
- `cspell.json` — spell checker (en-US dictionary + `custom-words.txt`)

**Content directories** under `/docs/`:
- `api-ref/` — auto-generated from OpenAPI specs (do not edit manually)
- `speech-to-text/` — Batch and Realtime transcription docs
- `text-to-speech/` — TTS product docs
- `voice-agents/` — Voice agents docs
- `voice-agents-flow/` — Flow platform docs
- `deployments/` — On-prem, container, and cloud deployment guides
- `integrations-and-sdks/` — Integration and SDK guides
- `get-started/` and `guides/` — General guides

**API specs** in `/spec/`:
- `batch.yaml` — Batch/Jobs API (OpenAPI)
- `realtime.yaml` — Realtime API (OpenAPI)
- `flow-api.yaml` — Flow API (AsyncAPI)

**URL redirects**: Defined in `/scripts/redirects/redirects.json`, synced to `vercel.json` via `npm run sync-redirects`. A post-build plugin (`plugins/check-redirects.ts`) validates all redirect targets exist.

**Custom plugins** in `/plugins/`:
- `source-loader.ts` — Webpack loader that lets MDX files import raw `.py`, `.sh`, `.yaml`, `.js` content

## Writing style (for .md/.mdx files)

Apply when editing documentation.

### Core writing principles

- **American English**: use en-US spelling and grammar consistently. ✅ *diarization, color* ❌ *diarisation, colour*
- **Sentence case** for all titles and headings. ✅ *Language identification* ❌ *Supported Formats and Limits*
- **Prioritize lowercase**: capitalize only proper nouns and product names. ✅ *Refer to the channel diarization guide for the Batch API.* ❌ *For troubleshooting Containers, please refer to the On-Prem Documentation.*
- **Keep it concise**: avoid redundant language. ✅ *Languages* ❌ *Speechmatics supported languages*
- **Paragraphs**: max 3 sentences each.
- **Active voice, second person, present tense** in descriptions.
- **Human-centric**: write for readers with varying levels of technical depth.
- **Jargon only when needed**: provide inline definitions or cross-links.
- **Empathy and clarity**: explain 'why' before 'how'.
- **Enterprise-ready**: use numbered sequences, modular sections, and cross-references to deeper specs.

### Glossary

**Batch** — the Speechmatics API for transcribing pre-recorded audio files; asynchronous, returns full transcript on completion.
- **Batch** (capitalized) = the Speechmatics API product. ✅ *Submit your file to Batch to receive a complete transcript once processing is done.*
- **batch** (lowercase) = generic grouped processing. ✅ *Queue multiple files for batch conversion over a more extended period.*

**Batch job** — a request to the Batch API that processes a pre-recorded audio file and returns the full transcript once complete.

**Diarization** — automatic segmentation of audio by speaker identity. Always use *diarization* (not synonyms) for consistency.

**On-prem** — short for *on-premises* (plural, not *on-premise*); running Speechmatics technology within clients' own infrastructure.

**Realtime** — the Speechmatics API for live transcription; processes streaming audio and returns results as speech is received.
- **Realtime** (capitalized, no hyphen) = the Speechmatics API product. ✅ *You can stream audio to Realtime to receive instant transcription results.*
- **real-time** (hyphenated) = general adjective for low-latency systems. ✅ *The system returns real-time results.*

**Realtime session** — a continuous transcription process where audio is streamed and transcribed as received, with low latency.

**Speech to text** — Speechmatics' core product group converting spoken audio to written text via ASR models.
- **speech to text** (no hyphens) = open compound noun phrase. ✅ *Our platform supports speech to text and text to speech.*
- **speech-to-text** (hyphenated) = compound modifier before a noun. ✅ *We offer speech-to-text conversion for streaming media.*

**Voice agents – Flow** — platform for conversational AI agents. Use an en dash (&ndash;) between the terms, not a hyphen or em dash.

### Content framework

**Navigation item names**: prefer 1–2 words; keep under 3 words; sentence case only. ✅ *Language identification* ❌ *Virtual Appliance Usage Reporting*

**Page titles**: may differ from nav item; keep under 5 words if possible; sentence case only.

**Descriptions**: one-sentence benefit-led statement; second person, active voice, present tense.
- ✅ *Learn how to transcribe pre-recorded audio files.*
- ✅ *Enable the model to fetch data and take actions.*
- ✅ *Take your first steps with the Speechmatics API.*
- ❌ *Speechmatics can turn audio into text.*
- ❌ *This page will give you comprehensive details on the API.*

**Headings**: no hard word limit, but keep concise — use context to reduce wording. ✅ *Examples* ❌ *Realtime output examples*

**Visual hierarchy**:
1. **Page title (H1)** — main topic, e.g., *Quickstart*
2. **Section heading (H2)** — key steps or concepts, e.g., *Realtime processing*
3. **Subheading (H3+)** — finer details within a section, e.g., *Operating points*
4. **Paragraph** — up to 3 sentences

### Doc types

**Overview** — create for every product or top-level item needing a definition. Principles:
1. Define core concepts: list terms with one-sentence definitions and links to the API reference.
2. Include key use cases (as bullets).
3. High-level flow (optional): a simple diagram or numbered list.
4. Point to next steps: link to Quickstart, API reference, or tutorials.

**Quickstart** — guide users from zero to working code in under 5 minutes. Principles:
1. Keep it concise and scannable.
2. List actionable steps.
3. Code-first: show snippets before explaining them.
4. Offer multi-platform examples.
5. Include troubleshooting tips and link to the error messages guide.
6. Point to next steps: end with links to API reference, tutorials, or SDK guides.

Tips: minimal prose (code over paragraphs; use prose only to clarify 'why'); call out setup quirks as inline notes; use the same section order across all Quickstarts.

**Guide** — detailed workflows or feature sets. Principles:
1. Organize into clear numbered steps, each covering a logical unit of work.
2. Mix prose with code: introduce each step with a brief "why" (1–2 sentences), then show the code snippet.
3. Highlight essential details using admonitions for notes, tips, and cautions.
4. Include examples and expected results.
5. Offer troubleshooting guidance: anticipate common errors and link to the error messages guide.
6. Point to next steps: link to Quickstart, API reference, or deeper tutorials.

**Admonitions** use Docusaurus syntax:
```
:::info
This is an admonition
:::
```
