# Restructure debt and open flags

Branch: `docs-restructure-test` · PR [#302](https://github.com/speechmatics/docs/pull/302) (**must never merge**)
Updated: 12 Aug 2026

Everything outstanding from the STT restructure, in one place. Nothing here blocks the
preview. `New` marks something this work introduced or discovered; `Pre-existing` marks
something that was already true on `main`.

Recovery point: tag `pre-restructure` is the last green pre-move state.

---

## 1. Source of truth: the product catalogue

`feature-availability.md` is generated from the upstream STT product catalogue. A wrong
value can only be fixed upstream and regenerated. Hand-edits are reverted by the next
regeneration, and `CLAUDE.md` forbids them.

**`feature-availability.md` currently carries one hand-edit** — on-prem pre-recorded
notifications, `No` → `Yes`, made at the owner's request. It reverts on regeneration.

Corrections the catalogue needs:

| # | Item | Catalogue says | Should say | Source |
|---|---|---|---|---|
| 1 | on-prem pre-recorded notifications | `No` | `Yes` | Owner confirmed; the deployments matrix was right |
| 2 | streaming app usage tracking | absent from Items (implies `n/a`) | `Yes` | `sm-app` is documented and works |
| 3 | agent STT force end of utterance | `Not yet` | `Yes` | `ForceEndOfUtterance` shipped; it *is* the `external` profile |
| 4 | agent STT entity detection (basic) | `No` | `Yes` | `enable_entities` shipped |
| 5 | agent STT audio filtering | `No` | `Yes` | `volume_threshold` shipped |
| 6 | Feature discovery | absent from Items entirely | present | Live endpoint, has a docs page |
| 7 | Tracking | absent from Items entirely | present | Documented `JobConfig` object |
| 8 | streaming Melia 1 custom dictionary | `TBD` | `Not yet` | PR #296 draft roadmaps it — `New` |
| 9 | streaming Melia 1 translation | `No` | `Not yet` | PR #296 draft roadmaps it — `New` |
| 10 | streaming Melia 1 audio events | `No` | `Not yet` | PR #296 draft roadmaps it — `New` |

Items 8–10 change no published output — all three values mean "do not document" — but the
values are wrong.

### Dimensions the catalogue does not have

- **No language dimension.** Per-language limits have nowhere to live: sentiment is
  English-only, chapters has 5 unsupported languages, language identification has 10,
  smart formatting has 17. This is the structural reason DEL-33895 exists.
- **No latency-control Item.** `New` — so the Melia 1 streaming `max_delay` /
  `max_delay_mode` gap and its ~4s average finals latency have no home. Both are currently
  documented as prose on the feature page.

### Values needing confirmation

- On-prem container release numbers for **every** `Released` combination. The readiness
  rule requires naming the release; no page names one.
- Which `No` items do readers repeatedly ask about? The rule permits a "not supported"
  statement only with that evidence, so today none are stated.
- Feature discovery and speaker focus are live and documented but absent from the
  catalogue. Add them, or publish without an availability statement?

---

## 2. Content gaps needing an owner

- **agent STT has no runnable quickstart code.** The source page had only an Academy link.
  Needs Python and JavaScript samples written and executed.
- **agent STT has no limits content at all** — no concurrency, session duration, or
  retention — while streaming documents all three. Confirm this is a real gap, not an
  omission.
- **Melia 1 streaming has no feedback route.** `New` — the readiness rule for Preview
  requires inviting evaluation and feedback. The PR #296 draft's route could not ship: the
  URL was the literal placeholder `https://REPLACE-WITH-FEEDBACK-FORM-URL`, tied to an
  11 September 2026 deadline. Decide the durable route, and whether the demo at
  `melia-rt-preview.speechmatics.cloud` is public enough to link.
- **`streaming/ffmpeg-audio.mdx`** keeps the per-OS FFmpeg install and device enumeration
  (documented nowhere else), but its legacy CLI recipe still targets `speechmatics-python`
  and needs rewriting against `speechmatics-rt`. Needs an owner to write and test.
- **Voice SDK preset names disagree.** The shipped `quickstart.py` uses lowercase
  `preset="scribe"`; the prose lists `SCRIBE`. Verify against the SDK.
- **`batch/usage.mdx` was merged into `administration/usage.mdx`.** Needs that page
  owner's agreement.
- **Dropped from PR #296, restore if wanted:** `New` — the qualitative smart-formatting
  claim "improved accuracy, e.g. recognition of email/web addresses" for Melia 1
  streaming. Left out as unverifiable, not as a rules violation.

---

## 3. Structural decisions for DevX (Matt and Pete)

- **PR [#296](https://github.com/speechmatics/docs/pull/296) now duplicates published
  content.** `New` — its `docs/private/melia-1-realtime.mdx` covers the same ground as
  `/speech-to-text/features/mixed-language-transcription`,
  `/speech-to-text/models#melia-1-streaming` and `/get-started/authentication`. If both
  land, the content exists twice, once robots-disallowed. Decide whether #296 closes in
  favour of the public pages or stays as the customer handout.
- **`private/next-gen-model.mdx`** publishes "Q3 2026" for unreleased work in a public
  repo, against the style guide. PR #296 replaces that line but keeps the "codenamed Omni"
  framing, and points at a private page that may go away.
- **Publishing agent STT out of `/private/` makes it crawlable.** `robots.txt` disallows
  `/private/`. That is a disclosure decision for whoever owns the Preview launch.
- **The "one availability mechanism" rule is stated too broadly.** `New` — as written it
  forbids "a table whose axes are interaction pattern, model, deployment, region, or
  readiness" anywhere outside `availability/`. That does not distinguish an availability
  matrix from a legitimate side-by-side comparison, and
  `agent-stt/index.mdx` has a `| Model | Standard, Enhanced, Melia 1 | Linden 1 |` row in
  a streaming-vs-agent-STT comparison table that sits in the grey zone. Sharpen the rule.
- **No `pre-recorded/index.mdx` or `streaming/index.mdx`.** `New` — the plan's IA
  specified index pages for both. They were deliberately not created: the content would
  duplicate `interaction-patterns.mdx` and would breach the style guide's rule against
  pages that only describe relationships between other pages. Model choice is now
  signposted from the pattern sidebars instead. Confirm that stands.
- **The 5-column table cap** in `docs-style-guide.md` needs revisiting; the comparison
  tables in PR #278 already exceed it.
- **Deployments is out of scope** — 37 pages, 5739 lines. Its matrix in
  `deployments/index.md` is retained and corrected, not deleted: 19 of 21 rows agree with
  `feature-availability.md`, and the 2 that diverge are catalogue gaps (items 6 and 7
  above), not rogue content.

---

## 4. Build and tooling

| Status | Issue |
|---|---|
| Pre-existing | **Mermaid renders to nothing site-wide**, including `api-ref/realtime-transcription-websocket`. Prose equivalents currently carry the information. |
| Pre-existing | **`npm run spellcheck`'s `**/*.md` glob scans `build/`** — 12 of its 14 hits are generated output. Spellcheck is not in CI. Deferred as low priority. |
| Pre-existing | **Old `.md` mirror URLs 404** after the renames, because the Vercel sources do not match `.md`. Needs wildcard entries appended *after* all exact entries. `/llms.txt` itself is clean. |
| Pre-existing | **`spec/realtime.yaml` holds ~20 absolute and protocol-relative doc links**, invisible to the link checker, rendering into the busiest API page. Two use `http://`. |
| Pre-existing | `docusaurus.config.ts` uses the deprecated `siteConfig.onBrokenMarkdownLinks`; migrate to `markdown.hooks.onBrokenMarkdownLinks` before Docusaurus v4. |
| Pre-existing | postcss-calc parse warnings on the Radix CSS. Cosmetic. |
| Pre-existing | Docusaurus 3.9.2, with 3.10.2 available. |
| New | **Sidebar `type: "link"` hrefs bypass `onBrokenLinks`.** Two now carry fragments (`models#pre-recorded-models`, `models#streaming-models`). A checker exists but lives in a scratchpad; promote it into the repo as a real gate if the pattern stays. |
| Pre-existing | **A stale redirect destination survives in `old-redirects.json`:** `/features/accuracy-language-packs` → `/speech-to-text/languages#multilingual-speech-to-text`, an anchor that no longer exists. Harmless at runtime — `redirects.json` supplies the same source with the correct `#bilingual-and-multi-language-packs` anchor and is emitted first, so Vercel's first-match-wins takes the good one. The stale entry is unreachable dead weight. Fixing it means editing a legacy historical file. |
| Pre-existing | **Seven trailing-slash destinations remain in `vercel.json`**, all from the legacy files (`/features`, `/features-other`, `/speech-capabilities` → `/speech-to-text/`; `/on-prem/virtual-appliance`; `/on-prem/containers/usage/what-data`; plus two external pypi.org URLs where it does not matter). Each internal one costs one extra normalisation hop. |

Baselines to hold rather than fix, all pre-existing: `npx tsc` 27 errors, `biome check` 5.
Never run `biome --write` on `vercel.json` — `sync-redirects` writes it without a trailing
newline, so the two fight forever.

---

## 5. Verification that only a deployment can do

`vercel.json` and `middleware.ts` are inert under `docusaurus start`, so redirect
*behaviour* cannot be tested locally. **Run on 12 Aug 2026 against the preview — all
passed**, and it caught the trailing-slash extra hop that no local check could see:

| Legacy URL | Result |
|---|---|
| `/voice-agents-flow/setup` | 1 hop → `/speech-to-text/agent-stt/quickstart` — was three hops |
| `/on-prem/containers` | 1 hop → `/deployments/container/accessing-images` — was a production 404 |
| `/introduction/rt-guide` | 1 hop → `/speech-to-text/streaming/quickstart` |
| `/features-other/tracking` | 1 hop → `/speech-to-text/pre-recorded/output#tracking-metadata` |
| `/features-other/auto-chapters` | 1 hop → `/speech-to-text/add-ons/chapters` |
| `/get-started/quickstart` | 1 hop → `/` |
| `/speech-to-text/batch/`, `/realtime/` | 2 hops, both to the right page — hop 1 is trailing-slash normalisation of the *visitor's* URL, which is unavoidable |

Still outstanding: the remaining legacy Flow sources, and one `.md` mirror URL to confirm
whether wildcard entries are needed. **Algolia needs reindexing after deploy.**

### Two things that are still measured wrong

- **`check-redirects.ts` does not validate fragments** — it resolves the destination path
  after normalisation, so a destination pointing at a non-existent anchor passes. The
  fragment-aware sweep has to be run separately over all 890 entries.
- **Duplicate normalized sources are 10, not the 4 recorded earlier.** Eight are benign by
  design: `normalizePath` strips fragments from sources, so a plain entry and its fragment
  variants collapse to one source and only the first can ever match. The plain entry is
  correctly ordered first in every case. Fragment-specific server-side redirects remain
  impossible; `src/theme/Root.tsx` is the client-side shim for the two that matter.
- A fragment-aware destination checker must special-case **static assets** — `/batch.yaml`
  and `/management.yaml` are real files, not pages with an `index.html`.

---

## 6. Jira

| Ticket | Action |
|---|---|
| DEL-33243 | Close as superseded. Its instruction is now forbidden by the readiness rules, and its blanket "not yet" framing was wrong for most of its scope: most items are permanent `No`, one is `TBD`, and only 5 of ~12 are actually `Not yet`. Its canonical target `models.mdx#compare-the-models` was deleted and has since been restored pointing at the new by-pattern section. |
| DEL-33895 | Keep In Progress. Four documentation ACs are already satisfied by existing content; the remainder is engineering (language count, per-language vs per-entity-class, Romanian/Turkish/Arabic). Retarget to `features/formatting.mdx` and `features/entity-detection.mdx`. Rooted in the catalogue's missing language dimension. |
| DEL-34047 | Keep open, retarget AC2 to `/speech-to-text/pre-recorded/input`. AC1 is a spec-side fix only (`spec/batch.yaml` or `scripts/generate-batch-spec.ts`); the generated page is gitignored. It was silently blocked by the `build:jobs-api-ref` rimraf bug, fixed in this branch. |
| DEL-34274 | Update the description: its premise is stale, since Melia 1 is GA on pre-recorded rather than Batch-only early access. Still correctly blocked, on Melia becoming the **default** and on the context files recording it. Retarget to `features/formatting.mdx` and `features/entity-detection.mdx`. |

---

## 7. Resolved this session, for the record

So these are not re-reported as open:

- **Melia 1 streaming Preview endpoint** — was unknown, blocking the streaming half of
  mixed-language transcription. It is `wss://preview.rt.speechmatics.com/v2`, France for
  EU and Oregon for US, SaaS only, existing API keys and `rt` temporary keys both work.
  It is the same host that serves agent STT.
- **`build:jobs-api-ref` cleaned the wrong directory** — `rimraf docs/api-ref/jobs` while
  the plugin `outputDir` is `docs/api-ref/batch`, so spec changes never reached the
  generated pages. Fixed.
- **`#compare-the-models`** — lost when the model comparison table was deleted, now
  restored on the by-pattern "Choose a model" section.
- Pre-existing bugs fixed in passing: 6 protocol-relative `//api-ref` links; the
  `/deployements/` typo that 404'd `/on-prem/containers` in production; 3 duplicate
  `/voice-agents-flow` entries; 5 stale URLs in code comments; 2 redirect fragments
  pointing at anchors that never existed; `spec/realtime.yaml`'s `#max-speakers` and
  `#prefer-current-speaker` plus an `http://` link; invalid JSON (`"speaker": 'S1'`); a
  second H1 in sentiment; an empty date range (2023-01-01 to 2023-01-01, should be 2024);
  duplicate `default` on two TabItems; 8 inert `quickstart=` props; 4 over-length card
  descriptions; 8 two-hop redirect chains.
