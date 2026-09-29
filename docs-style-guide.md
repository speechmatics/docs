<!-- cspell:ignore diarisation colour recognise -->

# Speechmatics Docs Style Guide
 
Source of truth for writing, structuring, and maintaining content on docs.speechmatics.com.
 
**Scope:** docs.speechmatics.com only. Does not govern speechmatics.com, portal.speechmatics.com, or Confluence.
 
**Owners:** Matt and Pete at DevX. Flag gaps or propose changes in the shared Claude project.
 
**Using this guide:** Start with Content types before writing anything. Use the quality checklist in Governance before publishing.
 
---
 
# Core writing principles
 
"✅" = do / "❌" = don't
 
---
 
1. **Write concisely.** Remove words that add length without adding meaning. No imprecise qualifiers like "quickly" or "easily."
❌ Speechmatics supported languages → ✅ Languages
 
❌ Note that this command requires admin rights. → ✅ This command requires admin rights.
 
---
 
2. **American English.** Use en-US spelling and grammar throughout.
❌ diarisation, colour, recognise → ✅ diarization, color, recognize
 
---
 
3. **Lowercase by default.** Capitalize named products and APIs only. Common nouns, feature descriptions, and deployment methods are lowercase.
❌ For Troubleshooting Containers, see the On-Prem Deployments Documentation. → ✅ Refer to the channel diarization guide for the Batch API.
 
---
 
4. **Sentence case in headings.** Capitalize first word and proper nouns only.
❌ Language Identification → ✅ Language identification
 
❌ Supported Formats and Limits → ✅ Supported formats and limits
 
---
 
5. **Active voice.** The subject performs the action.
❌ A job ID is returned by the API. → ✅ The API returns a job ID.
 
❌ The webhook endpoint should be configured. → ✅ Configure the webhook endpoint.
 
---
 
6. **Second person for instructions.** Use "you." Not "the user" or "the developer."
❌ The user can configure the timeout in the request body. → ✅ You can configure the timeout in the request body.
 
Exception: reference content describing system behavior uses third person.
 
---
 
7. **Avoid filler phrases.**
❌ Note that this command requires admin rights. → ✅ This command requires admin rights.
❌ Please run the installer. → ✅ Run the installer.
❌ Keep in mind that jobs expire after 24 hours. → ✅ Jobs expire after 24 hours.
❌ It is important to configure authentication first. → ✅ Configure authentication first.
❌ Be aware that transcripts may take longer for large files. → ✅ Transcripts may take longer for large files.
❌ In order to start, install the package. → ✅ To start, install the package.
❌ Basically / Simply / Just...
 
---
 
8. **Include the reader.** Write for developers at different familiarity levels. Offer paths for faster readers without excluding others.
❌ Experts can ignore the basic setup and proceed directly to the advanced configuration. → ✅ If you're familiar with REST APIs, skip ahead to the request parameters.
 
---
 
9. **One sentence of context before a procedure.** A single sentence explaining why may precede the first step. More than one sentence belongs in an Explanation page, linked from the procedure.
❌ [Multiple paragraphs before the first numbered step.] → ✅ To maintain data privacy, deploy on-prem. Follow these steps to configure your server.
 
---
 
10. **One step, one action.** Each numbered step covers exactly one action. Instruction before explanation within a step.
❌ 1. Run the installer and enter your API key when prompted. → ✅ 1. Run the installer. 2. Enter your API key when prompted.
 
❌ Because this sets up the required environment variables, run the installer. → ✅ Run the installer. This sets up the required environment variables.
 
---
 
11. **Define jargon at first use.** Choose format by complexity:
- **Parenthetical:** for terms definable in a phrase. ✅ diarization (separating a transcript into individual speakers)
- **Note admonition:** for terms needing a full sentence or more.
- **Link:** for terms defined elsewhere. Link on first use; do not redefine inline.
Do not define terms more recognizable than their definitions: API, JSON, SDK, REST, WebSocket.
 
---
 
# Content types
 
Content types are authoring modes, not page templates. A page has a dominant mode but may move through multiple modes. Every section must serve one clear reader need.
 
Derived from the [Diátaxis framework](https://diataxis.fr/).
 
---
 
## The arbitration rule
 
Apply at every section, not just every page:
 
:::info What is the reader trying to do right now?
 
| The reader wants to... | Content type |
|---|---|
| Learn by doing and arrive at a working result | Tutorial |
| Complete a specific real-world task | How-to guide |
| Look up a fact, parameter, or specification | Reference |
| Understand how or why something works | Explanation |
 
If a section cannot be assigned to one of these, it is doing too many things. Split it.
 
:::
 
---
 
## When to blend, when to split
 
A page may move through more than one content type.
 
**The rule:** if an Explanation section is longer than the How-to section on the same page, the Explanation should be its own page.
 
This applies in one direction only. A long Reference section on an otherwise task-oriented page does not trigger a split.
 
---
 
## Naming pages
 
Content type labels do not appear in page titles.
 
| Content type | Effective title patterns | Avoid |
|---|---|---|
| Tutorial | "Get started with...", "Build your first...", "Transcribe a file" | "Tutorial: ..." |
| How-to guide | "Configure speaker diarization", "Authenticate with the API" | "Guide: ...", "How to guide: ..." |
| Reference | "Batch API reference", "Configuration parameters", "Error codes" | "Reference: ..." |
| Explanation | "How the Realtime API works", "Understanding diarization", "[Feature] concepts" | "Overview", "Introduction to...", "Explanation: ..." |
 
---
 
## Tutorial
 
Teaches through doing. The reader follows a guided sequence and arrives at a working result. Learning-oriented; assumes minimal prior knowledge.
 
Do not include background theory, design rationale, or optional variations. These belong in an Explanation.
 
### Quickstart
 
A Quickstart is a Tutorial scoped to first value only. Zero to working result in under five minutes.
 
All Quickstarts must follow this format:
 
1. **Time to first value:** fully readable and executable in 3–5 minutes.
2. **Actionable and scannable:** numbered steps. No prose blocks before acting.
3. **Code-first:** show the snippet before explaining it.
4. **Multi-platform examples:** offer examples across platforms and environments where the API supports it.
5. **Troubleshooting:** tips for the most common failure points; link to the error messages guide.
6. **Consistent structure:** all Quickstarts follow the same section order.
7. **Next steps:** end with a Next steps section.
---
 
## How-to guide
 
Helps the reader accomplish a specific real-world task. The reader has baseline competence and needs the steps.
 
Focus on steps only. Do not include conceptual background unless it directly affects the next action.
 
:::tip
If you find yourself writing "because" to explain a design decision, that content belongs in an Explanation. Move it there and link to it.
:::
 
---
 
## Reference
 
Factual information readers look up, not read. Neutral, consistent, complete.
 
Includes: API endpoints and parameters, configuration schemas, error codes, language and model support tables, limits and quotas.
 
Write as facts, not instructions. Every entry must be structurally consistent with every other entry of the same type.
 
---
 
## Explanation
 
Context and reasoning behind how something works. The reader wants to understand, not act.
 
Includes: how a product surface works, design rationale, comparisons, conceptual introductions.
 
Do not label explanation pages as "Overview." Use a title that describes what the reader will understand: "How the Realtime API works", "Understanding speaker diarization", "[Feature] concepts."
 
Do not include step-by-step instructions. Link to the relevant how-to guide or tutorial instead.
 
---
 
# Content elements
 
---
 
## Navigation item name
 
1–2 words preferred. Maximum 3. Use 4 or more only when no shorter option is accurate. Sentence case only.
 
❌ Virtual Appliance Usage Reporting → ✅ Usage reporting
 
---
 
## Page title (H1)
 
The page's main topic. Maximum 5 words. Sentence case only. Must make sense out of context.
 
❌ What Data Do We Record? → ✅ Data collection
 
---
 
## Description
 
A single sentence summarizing what the reader will do or learn. Appears below the title. Also used as the frontmatter `description` field for search and AI retrieval.
 
Second-person imperative, active voice, present tense, sentence case. Maximum 158 characters.
 
✅ Learn how to transcribe pre-recorded audio files.
✅ Enable the API to identify and label individual speakers in a transcript.
✅ Take your first steps with the Speechmatics API.
 
❌ This page will give you comprehensive details on the API.
❌ Speechmatics can turn audio into text.
❌ Introduction and background to getting started with Batch.
 
---
 
## Heading (H2)
 
A concise label for a major section. Sentence case only. Must name the subject explicitly without relying on the page title for meaning.
 
❌ Using it → ✅ Using the Realtime API
❌ Configuration → ✅ Configure the Batch API timeout
 
---
 
## Subheading (H3+)
 
Use for finer distinctions within a section. Never immediately follow a heading — always insert at least one paragraph of prose between an H2 and an H3.
 
---
 
## Visual hierarchy
 
Use heading levels consistently. Do not skip levels: an H3 must sit inside an H2, not directly under an H1.
 
| Level | Purpose | Example |
|---|---|---|
| H1 | Page topic. One per page. | *Speaker diarization* |
| Description | Single sentence below H1. | *Enable the API to identify and label individual speakers.* |
| H2 | Major section. Names a distinct topic or step. | *Configure speaker diarization* |
| H3+ | Subdivision within an H2 section. | *Channel diarization* |
| Paragraph | Body text. 1–3 sentences. One idea per paragraph. | |
 
---
 
## Paragraph
 
1–3 sentences per paragraph. One idea per paragraph. Short paragraphs are easier to scan and improve AI retrieval chunking.
 
---
 
## Code snippet
 
**Language annotation:** required. Specify the language after the opening backticks.
 
**Context sentence:** required. Every snippet must be preceded by a sentence naming what the code does. Exception: Quickstarts use code-first order; the context sentence may follow. A snippet with no surrounding prose is not compliant.
 
**Inline comments:** required. At least one inline comment per snippet identifying the purpose or a key step.
 
**Length:** 10 lines or fewer for focused snippets. Add line numbers to longer or multi-step snippets.
 
**Copy button:** every code block must have copy functionality enabled.
 
---
 
## Table
 
Use for comparisons, structured properties, and listings where column relationships matter.
 
- **Header row** (required): sentence case.
- **Row striping:** alternating shading.
- **Accessibility:** include a brief `aria-label` or caption.
- **Size:** maximum 5 columns and 10 rows. Split larger datasets.
- **Caption** (optional): one sentence, maximum 80 characters.
---
 
## Card
 
A linked component surfacing a feature or guide. Every card is a link.
 
- **Icon** (optional): 32×32px. Left of title for single-line descriptions; above title for multi-line.
- **Title:** 2–4 words, 10–30 characters. Sentence case.
- **Description:** maximum 80 characters. One sentence.
Maximum 3 cards per row. Equal height across cards in the same row.
 
---
 
## Admonition
 
Use only when content cannot be communicated in the main prose.
 
**Frequency:**
- Never place two admonitions adjacent to each other.
- Warning and Danger: maximum one per page.
- More than three admonitions on a page signals a structural problem.
| Type | When to use | Tone |
|---|---|---|
| 🗒️ Note | Extra context not critical to the core content. | Clarify. |
| 💡 Tip | Non-critical shortcuts or best practices. | Suggest. |
| ℹ️ Info | Essential facts or background relevant to the subject. | Educate. |
| ⚠️ Warning | Risks where a reader could make a consequential mistake. | Direct, factual. |
| ⛔️ Danger | Critical risks, security issues, irreversible actions. | Firm. State the risk and a safe alternative. |
 
---
 
## Next steps
 
End pages that need further signposting with an H2 titled *Next steps*. Choose one format; do not combine more than two.
 
**Inline sentence:** one verb-led sentence with an embedded link. Maximum 150 characters. Use when only one related action is available.
 
**Context summary:** up to 3 short sentences transitioning into a list or link.
 
**Bullet list:** 3–5 verb-led phrases, each with an embedded link.
 
**Link list:** 2–5 items.
- Title link: 2–6 words, 10–30 characters.
- Description (optional): 8–12 words, maximum 60 characters.
---
 
# AI-readability standards
 
AI-readability is not a separate concern from good writing. Both require clear structure, consistent terminology, and content that makes sense without surrounding context.
 
---
 
## Frontmatter
 
Every page requires `title` and `description` in frontmatter.
 
`title` must accurately reflect the page content.
 
`description` is a single benefit-led sentence. Same rules as the Description content element. Maximum 158 characters. Do not leave empty or auto-generated.
 
```yaml
---
title: Configure speaker diarization
description: Enable the Speechmatics API to identify and label individual speakers in a transcript.
---
```
 
---
 
## Headings
 
Every heading must make sense without surrounding context.
 
- Name the subject explicitly: "Configure the Batch API timeout" not "Configure the timeout."
- No pronoun-dependent headings: "Using it" or "How this works" are not valid.
- Scope matches content: a heading describes everything beneath it and nothing else.
---
 
## Sections and chunking
 
Each H2 section must be independently coherent. A reader arriving at the section without reading the full page must be able to understand it.
 
Name the subject in the opening sentence. Do not rely on the heading to carry the subject into the prose.
 
❌ "It accepts the following parameters." → ✅ "The `transcribe()` method accepts the following parameters."
 
One concept per H2 section. Avoid forward and backward references ("as mentioned above", "see the next section"). Link explicitly to the target section instead.
 
---
 
## Terminology consistency
 
Use one term per concept. Do not introduce a term by one name and later refer to it by another on the same page. Full rules are in the terminology file.
 
❌ "Speaker diarization separates a transcript... The diarisation feature can be enabled..." → ✅ "Speaker diarization (referred to as diarization throughout this page) separates a transcript into distinct speakers."
 
---
 
## Code context
 
Every snippet requires a prose sentence naming what it does. This sentence is the retrieval context for AI systems.
 
For all content types except Quickstarts, the context sentence precedes the snippet. For Quickstarts, it may follow.
 
A snippet with no surrounding prose is not compliant, regardless of inline comments.
 
---
 
## Images and visual content
 
AI systems cannot process images. Every image must have a text equivalent.
 
**Alt text:** required on every image. Describes content and purpose, not appearance.
 
❌ `alt="diagram"` → ✅ `alt="Sequence diagram showing the WebSocket handshake between client and the Realtime API"`
 
**Diagrams:** must have accompanying prose conveying the same information. A reader who cannot see the diagram must lose nothing.
 
**Screenshots:** must not carry essential text. Any UI label, error message, or value visible only in a screenshot must also appear in the surrounding prose.
 
**Decorative images:** use `alt=""`.
 
---
 
# Governance
 
---
 
## Quality checklist
 
Every page must satisfy the following before going live.
 
**Structure**
- Content type is identifiable (the arbitration rule passes)
- Page title follows naming conventions
- Frontmatter `description` is present and complete
- Content is not duplicated on another page
**Content**
- All code snippets have a context sentence
- All specialist terms are defined at first use or linked
- No internal codenames, legacy product names, or deprecated terms
- All images have descriptive alt text
**Review**
- Reviewed by at least one person who did not write it
- All links checked and resolving correctly
---
 
## When not to create a new page
 
**Would this content work as a section on an existing page?** If yes, add a section.
 
**Does this content duplicate something covered elsewhere?** If yes, link to it.
 
**Is this content a response to a single question in one specific context?** If yes, it belongs as an admonition or note within the relevant page.
 
**Does this content only describe relationships between other pages?** If yes, it does not meet the content type standard.
 
---
 
## Ownership
 
Every page has an owner responsible for keeping it accurate when the product changes.
 
When a feature ships, changes, or is deprecated, the responsible team identifies affected pages and updates them before or at release. Documentation updates are not a post-release task.
 
Structural decisions — content location, categorization, information architecture — are escalated to the docs platform owners: Matt and Pete at DevX. This responsibility will transfer to a Documentation Lead if that role is created.
 
---
 
## Outdated and deprecated content
 
**Deprecated features:** mark explicitly with a note stating the replacement and a link to it.
 
**Removed features:** update or remove the page. Do not leave pages describing functionality that no longer exists.
 
**Stale content:** flag to Matt or Pete at DevX. Do not make unilateral updates to content you do not own.
 
---
 
## Proposing changes
 
Contact Matt or Pete at DevX directly with the proposed edit and a one-sentence rationale. Do not edit the project files or instructions before the proposal has been approved!