# Documentation restructure: organising the docs around how customers work

**Prepared for:** CPO
**From:** DevX (Matt and Pete)
**Date:** 12 August 2026
**Status:** Speech to Text shipped to a preview build. Deployments proposed, not started.

> Our documentation is arranged by how the API moves audio. Customers arrive thinking about
> the job they need done. This plan closes that gap.

| Area | Scale | Status |
|---|---|---|
| Speech to Text | 39 pages to 51 | Restructured, on a preview build for review |
| Deployments | 37 pages, 5,739 lines | Not yet touched. This plan covers it |
| Product catalogue | 10 known errors | Blocked on data, upstream of documentation |

Phase one is reviewable now on a preview build. It is deliberately not a merge candidate:
it exists so this plan can be judged against something real rather than described.

- Preview build: https://docs-git-docs-restructure-test-speechmatics.vercel.app
- Working branch and detail: pull request #302 (marked do not merge)

---

## Why this work exists

Three problems, each measured from the current content rather than asserted. They share one
root cause: the structure encodes our internal architecture instead of the customer's task.

### 1. The structure names our transport, not the customer's job

URLs were built around *processing modes* — Batch and Realtime — which describe how audio
reaches us. Customers think in terms of the work: a recording to transcribe, a live stream
to caption, a conversation to feed an assistant.

Those are three different jobs, and two of them share the same transport. So "Realtime"
never told a reader which one they were doing.

### 2. What a feature supports was stated six different ways

Availability appeared in comparison tables, in prose, in per-page tabs, and most damagingly
was *implied by which folder a page lived in*. Language identification, subtitles and the
whole speech-intelligence set were pre-recorded-only purely because they sat under `batch/`.
Nothing on those pages said so. A reader could not tell what worked with what.

### 3. We were selling capabilities the docs did not describe

Agent STT and the Linden 1 model were documented only on an unlisted page, under a folder
name our own terminology forbids. Melia 1 for streaming had no public documentation at all,
despite being in Preview with customers.

### The organising principle

A customer's needs resolve along three axes:

1. **Interaction pattern** — pre-recorded, streaming, agent STT
2. **Model** — Standard, Enhanced, Melia 1, Linden 1
3. **Deployment** — SaaS on Cloud, on-prem

Every page should let a reader fix those three and know exactly what they get. Availability
gets exactly one home, derived from a single source of truth, so it cannot drift again.

---

## Part one: Speech to Text

**Status: shipped to preview.** Restructured and reviewable now. Nothing is merged.

### Before: arranged by transport

```
speech-to-text/
  batch/                  <- a transport, not a job
    quickstart, input, output, srt-format,
    alignment, language-identification,
    speech-intelligence/
  realtime/               <- a transport, not a job
    quickstart, input, output, guides/
  features/               <- features and add-ons mixed together
  models.mdx              <- a 13-row availability matrix
  languages.mdx

voice-agents/             <- a name our terminology forbids
private/
  voice-agent-api.mdx     <- unlisted, but publicly reachable
```

### After: arranged by the job

```
speech-to-text/
  interaction-patterns    <- the map: which job am I doing?
  pre-recorded/
  streaming/
  agent-stt/              <- now a first-class pattern
  models                  <- choose a model, organised by pattern
  languages/
  availability/           <- the single home for availability
    index                    (SaaS on Cloud)
    on-prem
  features/               <- model behaviour
  add-ons/                <- billed separately

voice-agents/ dissolved. Voice SDK moved to integrations-and-sdks/
```

### What changed for the reader

- **You pick a pattern, then a model.** Model guidance is organised per pattern, so a
  streaming reader sees the three models available to them and is told which trade-off each
  makes, rather than reading about a model they cannot use.
- **Availability has one home.** One reference, derived from the product catalogue, covering
  every combination for SaaS on Cloud and on-prem. Six competing mechanisms retired.
- **Agent STT is documented as a product.** Promoted from the unlisted page into six pages,
  marked Preview.
- **Melia 1 for streaming is published,** including its endpoint and the new per-word
  language reporting, marked Preview.
- **Features and add-ons are separated,** because one is model behaviour and the other is a
  billable extra. Readers were being asked to infer commercial packaging from a folder name.

### The constraint we held

No existing content or meaning could be lost. Every retired page was checked mechanically:
every configuration name and identifier it contained had to appear in the pages that
replaced it. **Nothing was lost across any merge.**

All old links still resolve — 890 redirects, verified against a live deployment rather than
assumed.

---

## Part two: Deployments

**Status: proposed.** 37 pages and 5,739 lines, deliberately left out of phase one. It is
the largest remaining block and has not moved with the rest of the product. Every figure
below is measured from the current content.

### What we found

#### 1. SaaS on Cloud has no home here

The section gives it three bullet points, then sends readers away. Endpoints, regions, data
residency and limits live scattered across Authentication and the availability reference.

Our largest commercial surface is documented as an aside, while on-prem gets 34 pages. A
customer comparing hosting options cannot make that comparison here.

#### 2. On-prem duplicates itself, because it is organised by mechanism

Container, virtual appliance and Kubernetes each get their own branch. **Six of eight major
topics are documented twice:** licensing, security, language identification, GPU and
networking all appear in both the container and virtual appliance branches.

Two more exist on only one side: monitoring and scaling for the appliance only,
troubleshooting for containers only. Drift is not a risk here, it is the default.

#### 3. The vocabulary is a release behind

95 uses of "Batch" and 88 of "Realtime", against 8 of "pre-recorded", 3 of "streaming", and
**zero mentions of agent STT**.

It also still uses "operating point" 14 times, a term we retired from Speech to Text, and
title-cases "Virtual Appliance" 44 times against our own terminology.

#### 4. On-prem readiness is unanswerable

Our rule is that anything available on-prem must name the container release it arrives in.
**No page names one.** A customer asking "which release do I need for Melia 1?" has nowhere
to look, and agent STT on-prem is not mentioned at all.

#### 5. Its feature table is the sixth availability mechanism, and it is mostly right

The overview carries a 21-row table keyed on transport and deployment. We audited every row:
**19 of 21 agree** with the source of truth.

The two that diverge are not table errors, they are capabilities missing from the product
catalogue entirely. So this table gets corrected and folded into the availability reference,
not deleted. It was doing real work.

### Current structure: by mechanism

```
deployments/
  index                      <- 3 SaaS bullets + the feature matrix
  container/                 12 pages
    licensing, additional-security, language-id,
    gpu-speech-to-text, cpu-speech-to-text,
    troubleshooting, ...
  virtual-appliance/         18 pages
    installation/
      licensing, license-features, system-requirements, ...
    administration/
      security, using-a-gpu, networking,
      monitoring, scaling, ...
  kubernetes/                3 pages
  usage-reporting/           3 pages, on-prem only but not visibly so
```

### Proposed structure: by deployment, then by task

```
deployments/
  index                      <- choose a deployment
  saas-on-cloud/
    index                    <- what Speechmatics hosts
    regions-and-residency    <- region is a SaaS-only attribute
    limits-and-scaling
  on-prem/
    index                    <- choose a delivery method
    system-requirements
    licensing                <- merges 3 pages into 1
    install/                 <- steps genuinely differ, so these stay split
      container
      virtual-appliance
      kubernetes
    models-and-releases      <- NEW: which models, which container release
    gpu                      <- merges 4 pages into 1
    security                 <- merges 2 pages into 1
    networking               <- merges 2 pages into 1
    monitoring-and-scaling
    usage-reporting/
    troubleshooting

on-device omitted: it is in development, and our rules forbid documenting it yet.
```

### The one genuinely new page

`models-and-releases` answers which models run on-prem and which container release each
arrives in. That question is asked constantly and is currently unanswerable. It is also the
page that most needs engineering input: we cannot write it without the release numbers.

### How the merge counts were derived

The counts above follow one rule: **conceptual content merges, procedural content does not.**

What licensing *is*, or what a GPU buys you, is the same regardless of how you deploy, so
that consolidates. How you install a container versus an appliance genuinely differs, so
that stays separate. This keeps the reduction honest instead of collapsing real differences.

---

## Structural debt and decisions

Carried in a single register on the working branch (`.CLAUDE/restructure-debt.md`) so
nothing is lost between phases. Most items are mechanical. The ones below are not, because
they need a decision or a budget rather than an edit.

### The bottleneck is upstream of the documentation

Availability now derives from one generated source of truth. That is the right design, and
it exposes something uncomfortable: the product catalogue that feeds it has ten known errors
and two missing dimensions. We cannot fix these in the documentation. A correction made in
the generated file is destroyed the next time it regenerates.

| Gap in the catalogue | Consequence for customers |
|---|---|
| 10 incorrect or missing values | Includes three agent STT capabilities that ship and work but are recorded as unavailable, and two live features absent from the catalogue entirely. |
| No language dimension | Per-language limits have nowhere to live. Sentiment is English-only, chapters lacks five languages, smart formatting covers seventeen. None of it is expressible. This is the root of a long-running ticket. |
| No latency dimension | Melia 1 streaming has no latency controls and averages about four seconds to a final transcript. Materially important to a buyer, and there is no field for it. |
| No on-prem release numbers | The unanswerable question in Part two. Blocks the proposed `models-and-releases` page. |

### Content we are selling but have not written

- **Agent STT has no working code example** and no limits page, meaning no concurrency,
  session duration or retention figures, while streaming documents all three. It is in
  Preview with customers now.
- **The Melia 1 streaming Preview has no feedback route.** Our own rule says a Preview must
  invite feedback. The draft we inherited pointed at a placeholder URL.

### Two governance points

- **Publishing agent STT makes it crawlable.** It previously sat behind a no-index folder.
  Moving it into the public tree is a disclosure decision about a Preview product, not a
  documentation decision.
- **One of our own new rules is too blunt.** To stop availability tables spreading, we
  banned them outside the availability reference. As written, that also bans legitimate
  side-by-side comparisons. It needs sharpening before it starts blocking good pages.

---

## Sequence

Each phase ends with the site building and every old link resolving, so work can stop
between phases without leaving the documentation broken. That was the main lesson from
phase one.

| # | Phase | Notes |
|---|---|---|
| 1 | Speech to Text restructure | **Done.** Pattern-led structure, single availability home, agent STT and Melia 1 streaming published. On a preview build, merged nowhere. |
| 2 | Review and decide | **Needs you.** Confirm the pattern-led structure as the standard. Everything downstream assumes it, including all of Deployments. |
| 3 | Catalogue corrections | **Engineering.** The ten fixes and the two missing dimensions. Runs in parallel and gates the availability claims in both sections. |
| 4 | SaaS on Cloud gets a home | The smaller half of Deployments and purely additive. Nothing moves, so nothing can break. Gathers the scattered endpoint, region and residency facts into one place. |
| 5 | On-prem reorganisation | The large one. Task-led structure, duplicated topics consolidated, vocabulary brought forward, and the new `models-and-releases` page once engineering supplies the numbers. |
| 6 | Close the content gaps | Agent STT examples and limits, the Preview feedback route, and the remaining register items. |

---

## What we need from you

### 1. Endorse the organising principle, or tell us it is wrong

Interaction pattern, then model, then deployment. Phase one is a working demonstration
rather than an argument, so please judge it on the preview. Every later phase assumes this,
and a change of direction is far cheaper now than after Deployments moves.

### 2. Deployments needs an owner with engineering access

34 of its 37 pages are on-prem, and the highest-value page we propose cannot be written
without container release numbers. This is not a writing task that DevX can complete alone.

### 3. Treat the product catalogue as a product surface

It is now the single source for every availability claim in the documentation. It has ten
errors and cannot express language or latency at all. Whoever owns it needs to know that
documentation correctness now depends on it.

### 4. Decide what a Preview owes its customers

Agent STT and Melia 1 streaming are both in Preview and in customers' hands, and both are
missing things we would consider mandatory at general availability: working examples,
limits, a feedback route. Either we fund that content or we accept the gap knowingly.

---

## Notes on this document

- Figures are measured from the current content, not estimated.
- Part two is a proposal and has not been reviewed by a deployments owner.
- Phase one is on a test branch with a public preview build and is deliberately not a merge
  candidate.
