# Documentation restructure: scoping the problem

**Prepared for:** CPO
**From:** DevX (Matt and Pete)
**Date:** 18 August 2026
**Status:** Early-stage experiment. Not a committed plan, roadmap, or timeline.

We picked one section of the docs, Speech to Text, and rebuilt it end to end against a
different structure, on a branch, to find out three things: what the real problems are,
what a fix looks like in practice, and roughly how much work is involved. We then looked at
Deployments through the same lens without rebuilding it, to check whether the same problems
and the same fix apply there too.

The purpose right now is to scope this properly and work out a delivery estimate, not to
announce a rollout. This document sets out the problems we found and what we propose doing
about them.

The test rebuild is on a branch with a working preview, not merged and not going to be, so
it can be reviewed as a concrete example rather than a description:
https://docs-git-docs-restructure-test-speechmatics.vercel.app

---

## Foundations

Three things ground every proposal below. Without them, this would just be moving files
around.

- **The Diátaxis framework** decides what a page should be: a tutorial, a how-to, a
  reference, or an explanation. A page that mixes types is a defect, not a style choice.
- **Our product architecture** is the canonical model of what we sell: interaction pattern
  (pre-recorded, streaming, agent STT) by model by deployment. This is what "correct"
  means when we say a page is wrong.
- **The style guide** sets the editorial rules: terminology, naming, table limits, tone.
  This is what "well-written" means, independent of structure.

---

## The problems

### Speech to Text is organised by transport, not by task

- URLs are built around **processing modes** (Batch, Realtime), which describe how audio
  reaches us, not the job a customer is doing. Two different jobs, streaming and agent STT,
  share one transport, so "Realtime" alone never tells a reader which one they're using.
- What a feature supports was stated **six different ways** — comparison tables, prose,
  per-page tabs, and most damagingly, implied only by which folder a page lived in.
  Language identification, subtitles, and the whole speech-intelligence set read as
  pre-recorded-only purely because they sat under `batch/`. Nothing on those pages said so.
- We were **selling capabilities the docs didn't describe**. Agent STT and the Linden 1
  model lived only on an unlisted page, under a folder name our own terminology forbids.
  Melia 1 for streaming, in Preview with customers, had no public documentation at all.

### Deployments has the same root problem, plus its own

- **SaaS on Cloud has no real home.** The section gives it three bullet points, then sends
  readers elsewhere. On-prem gets 34 of the section's 37 pages.
- **On-prem duplicates itself.** Licensing, security, language identification, and GPU are
  each documented twice, once for container deployment and once for the virtual appliance.
  Networking exists as two separate documents, both only in the virtual appliance branch.
  Monitoring and scaling are virtual-appliance only; troubleshooting is container-only.
- **The vocabulary is a release behind.** 95 uses of "Batch" and 88 of "Realtime" against 8
  of "pre-recorded" and 3 of "streaming" — and zero mentions of agent STT. "Operating
  point", a term we retired, still appears 14 times.
- **On-prem readiness is unanswerable.** Anything available on-prem is supposed to name the
  container release it arrives in. No page names one.
- **Its feature matrix is a sixth, undocumented availability mechanism** — and it's mostly
  right. We checked all 21 rows against the real source of truth: 19 agree.

---

## What we're doing

The response in both areas is the same move: **organise around the product architecture's
own axes** — interaction pattern, then model, then deployment — instead of around transport
or delivery mechanism.

### Speech to Text

- `pre-recorded/`, `streaming/`, and `agent-stt/` replace `batch/` and `realtime/`. The old
  terms stay in the API reference and in prose, per the terminology rules.
- **One availability reference**, derived from a single source of truth, covering SaaS on
  Cloud and on-prem, retiring the six competing mechanisms.
- **Agent STT promoted** to a first-class, public section, marked Preview.
- **Melia 1 for streaming published**, marked Preview.
- **Features separated from add-ons** — model behaviour is not the same thing as a billable
  extra, and the two were mixed together.

### Deployments

- Split by **deployment first** (SaaS on Cloud, on-prem), then by **task** rather than by
  delivery mechanism, so a topic like licensing has one home instead of several.
- **Consolidate the duplicated on-prem topics** — licensing, security, language ID, GPU,
  and networking.
- **A new page naming which models run on which on-prem release** — the readiness question
  that's currently unanswerable.
- **Bring the vocabulary current** with the rest of the docs.
- **Fold the deployments feature matrix into the single availability reference**, corrected,
  rather than deleting it — most of it was right and it was doing real work.

---

## What this means for the estimate

Things that affect scope and timeline, surfaced by doing the test rebuild rather than
assumed in advance:

- **The data behind availability has its own problems.** The catalogue that feeds the
  single source of truth has 10 known errors and can't express two dimensions we need —
  language and latency. That's a fix outside documentation, and it sits upstream of every
  availability claim in both sections.
- **On-prem container release numbers don't exist anywhere yet.** The new page above can't
  be written until they do.
- **Two Preview products have real content gaps, not just structural ones.** Agent STT has
  no runnable example and no limits documented. Melia 1 streaming has no feedback route,
  which our own Preview rules require.
- **Deployments hasn't been reviewed by anyone who owns it.** What's above is our read of
  the content alone.
- **Redirects can only be verified against a live deployment**, not a local build — worth
  building into any timeline for the real rollout.
- **Content preservation is checkable mechanically** — every identifier in a retired page
  can be asserted present in its replacement — which is reassuring for scope, since it means
  "don't lose anything" is a testable gate, not a hope.

---

This is the input we're using to size the remaining work. Deployments in particular still
needs a review from someone who owns that content before any estimate on it is reliable.
