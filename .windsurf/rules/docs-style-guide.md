---
trigger: model_decision
description: Apply this rule when working on .md or .mdx files in the docs folder of the docs repo
---

This guide will help you write clear, consistent, and user-friendly content for the Docs.

Make it easier for readers to find what they need and understand how to use our products.

* * * * *

Glossary
========

The glossary defines key terms used throughout the documentation to help ensure clarity and consistency.

### Batch

The Speechmatics' API for transcribing pre-recorded audio files. It performs speech-to-text conversion on complete audio inputs and returns the full transcript upon completion of processing. It's designed for asynchronous use cases where low latency isn't required.

Grammatical context:

-   **Batch** (capitalized) refers to the **Speechmatics' API product** for processing pre-recorded audio.

    -   Example: *Submit your file to Batch to receive a complete transcript once processing is done.*

-   **batch** (lowercase) is a **generic term** referring to any method of grouped processing.

    -   Example: *Queue multiple files for batch conversion over a more extended period.*

### Batch job

A request to the Batch API that processes a pre-recorded audio file and returns the full transcript once processing is complete.

### Diarization

The process of automatically segmenting audio by speaker identity.

Note: Don’t swap in synonyms—always use diarization to ensure consistency.

### On-prem

It is short for *on-premises* (plural), not *on-premise* (singular), and refers to running Speechmatics technology within clients' own infrastructure, rather than using cloud-based APIs.

### Realtime

The Speechmatics' API for live transcription. It processes streaming audio input and returns transcription results as speech is received, enabling low-latency, continuous speech-to-text conversion for real-time applications.

Grammatical context:

-   **Realtime** (capitalized, no hyphen) refers to the **name of the Speechmatics' API product** for transcription of streaming audio.

    -   Example: *You can stream audio to Realtime to receive instant transcription results.*

-   **real-time** (hyphenated) is a **general-purpose adjective** describing processes or systems that operate with minimal delay.

    -   Example: *The system returns real-time results.*

### Realtime session

A continuous transcription process where audio is streamed to the API and transcribed as it's received, enabling immediate feedback with low latency.

### Speech to text

A core software component or service that converts spoken audio into written text using Speechmatics' ASR models from streaming audio (Realtime) and pre-recorded files (Batch). It is Speechmatics' product group.

Grammatical context:

-   **speech to text** (no hyphens) is typically used as an  **open compound noun phrase**.

    -   Example: *Our platform supports speech to text and text to speech.*

-   **speech-to-text** (hyphenated) is used as a **compound modifier** before a noun.

    -   Example: *We offer speech-to-text conversion for streaming media.*

### Voice agents &ndash; Flow

A platform for creating conversational AI agents that can understand and respond to users in natural, real-time conversations.

Grammatical context:

-   Use an en dash (&ndash;) to indicate a connection between two equal terms in a name. Avoid using a hyphen (-) here&mdash;it suggests a single compound word rather than a title hierarchy&mdash;and steer clear of an em dash (&mdash;), which is too heavy for navigation items or section titles.

* * * * *

Core writing principles
=======================

## Dos and Don'ts

The ✅ emoji precedes a correct use example. 

The ❌ emoji precedes an incorrect use example.

### Keep it concise

Write clearly and avoid redundant language.
✅ *Languages*
❌ *Speechmatics supported languages*

### American English

Use en-US spelling and grammar conventions consistently.
✅ *diarization and color*
❌ *diarisation and colour*

### Prioritise lowercase spelling

Capitalize only proper nouns, like product names, to maintain a clear content hierarchy.
✅ *Refer to the channel diarization guide for the Batch API.*
❌ *For troubleshooting Containers, please refer to the On-Prem Documentation.*

### Sentence case in titles and headings

It is more elegant and less overbearing than title casing. Especially for longer titles. ([more tips](https://www.everyinteraction.com/articles/title-case-vs-sentence-case-in-ui/))

✅ *Language identification*
❌ *Supported Formats and Limits*

### Human-centric

Write in a way that includes readers with various levels of technical depth.

### Jargon only when needed

With inline definitions or cross-links to relevant pages.

### Empathy and clarity

Explain 'why' before 'how'.

### Enterprise-ready

Numbered sequences, modular sections, and cross-references to deeper specs.

* * * * *

Content framework
=================

Elements
--------

### Navigation item name

1 or 2-word names are preferred. Try to keep it under 3 words. Use 4 or more words only if no other choice is available. Use sentence case only.

✅ *Language identification*
❌ *Virtual Appliance Usage Reporting*

### Page title

It may differ from the corresponding navigation item title.
Try to keep it under 5 words if possible.
Use sentence case only.

### Description

A one-sentence benefit-led 'What you'll do*'* statement that sparks interest.
Second person, active voice, present tense.

✅ *Learn how to transcribe pre-recorded audio files.*
✅ *Enable the model to fetch data and take actions.*
✅ *Take your first steps with the Speechmatics API.*
✅ *Explore speech features in the Speechmatics API.*
✅ *Ensure the microphone input works correctly.*
✅ *Allow Flow to use your custom LLM.*

❌ *Speechmatics can turn audio into text.*
❌ This is a quickstart guide for developers that shows how to transcribe.
❌ *This page will give you comprehensive details on the API.*
❌ *A quick overview of everything you might possibly need.*
❌ *In-depth information and exhaustive guide.*
❌ *Understand the concepts better with this detailed document.*
❌ *We'll discuss several important aspects and usage examples.*
❌ *Introduction and background to getting started with our features.*
❌ *Explanation of how certain things can be done in our platform.*

### Heading

There is no word limit, but keep it concise and meaningful.
Use the context to reduce the wording. Use sentence case only.

✅ *Examples*
❌ *Realtime output examples*

### Paragraph

Short paragraphs make content scannable and easy to digest. Respect readers' time and keep them to a maximum of 3 sentences long.

**PRO TIP**
Use your favourite LLM to paraphrase, shorten text, or suggest improvements. Share this guide or parts of it to provide the context.

Visual hierarchy
----------------

Help readers find information quickly by organizing content into clear levels of text. Use the following principles:

-   **Headings** guide the eye and break up content into logical chunks.

-   **Subheadings** show relationships and group related ideas.

-   **Paragraphs** deliver detailed explanations under each heading.

### Text styles and relationships

1.  **Page title (H1)** -- the main topic, e.g., *Quickstart*.

2.  **Section heading (H2)** -- key steps or concepts, e.g., *Realtime processing*.

3.  **Subheading (H3+)** -- finer details within a section, e.g., *Operating points*.

4.  **Paragraph** -- up to 3 sentences per paragraph.

* * * * *

Doc types
=========

Overview
--------

Create an Overview for **every** product or top-level item that requires a definition (e.g., Flow or Container deployment). Provide readers with the big picture, the meaning, and help them decide whether to delve deeper or move on. Using these principles:

1.  **Define core concepts**: List terms, such as *job* or *Flow engine*, with one-sentence definitions and links to the API reference if available.

2.  **Include key use cases** (as bullets)

3.  **High-level flow** (optional): A simple diagram or numbered list, e.g., for Send audio → Receive transcription.

4.  **Point to next steps:** Link to any related content, e.g., *Quickstart, API reference,* or *Tutorials.*

Quickstart
----------

The 'first sprint' for developers integrating the Speechmatics API. Guide users from zero to working code in under five minutes with these principles:

1.  **Keep it concise and scannable**

2.  **List actionable steps**

3.  **Keep it code-first**: Show snippets before explaining them.

4.  **Offer multi-platform examples**

5.  **Include troubleshooting tips** and link to the error messages guide

6.  **Point to next steps**: End with links to the complete API reference, tutorials, or SDK guides to sustain momentum.

**Tips**

**Time-to-first-value:** keep the entire Quickstart readable in 3--5 minutes.
**Minimal prose:** code over paragraphs; use prose only to clarify 'why'.
**Environment notes:** call out setup quirks as inline notes.
**Consistency:** aim to use the same section order across all Quickstarts.

Guide
-----

Guides walk readers through more detailed workflows or feature sets. They provide instructions, best practices, and deeper explanations.

1.  **Organize into clear steps**: Break the procedure into numbered sections or headings, each covering a logical unit of work.

2.  **Mix prose with code**: Introduce each step with a brief "why" (1--2 sentences), then show the code snippet that achieves it.

3.  **Highlight essential details**: Use admonitions for notes, tips, and cautions (e.g., authentication quirks, rate limits). Admonitions follow the docusaurus layout, for example:
:::info
This is an admonition
:::

4.  **Include examples and expected results**

5.  **Offer troubleshooting guidance:** Anticipate common errors at key steps and link to the error messages guide.

6.  **If applicable, point to next steps**: At the end, point to the Quickstart, API reference, or deeper tutorials.