# Terminology and product naming

Consistent terminology is the foundation of both human readability and AI retrieval. This file establishes the canonical form for every term that appears in the Speechmatics docs.

For product structure (processing modes, models, SKU primitives, SKU names), see `product-architecture.md`. That file is the single source for how the product is structured; this file governs only the words used to name and describe it.

---

## Capitalization

Capitalize named products and APIs. Use lowercase for capabilities and deployment methods.

| ✅ Do | ❌ Don't |
|---|---|
| Submit a job to the Batch API. | Submit a job to the batch API. |
| Batch transcription processes pre-recorded audio. | Batch Transcription processes pre-recorded audio. |
| The Standard model is recommended for most use cases. | The standard model is recommended for most use cases. |

Deployment methods are common nouns: write "on-prem deployment", "on-device deployment", "container deployment", "virtual appliance" in lowercase. The named cloud surface "SaaS on Cloud" is the exception, capitalized as shown.

---

## Canonical product and API names

| Canonical form | Do not use |
|---|---|
| Realtime API | Real-time API, Real Time API, RT API |
| Batch API | batch API |
| Speech to Text | Speech-to-Text, Speech-To-Text, STT (except after first-use definition) |
| Text to Speech | Text-to-Speech, Text-To-Speech, TTS (except after first-use definition) |
| Standard | standard (when referring to the model by name) |
| Enhanced | enhanced (when referring to the model by name) |
| Speechmatics | SM, speechmatics |

---

## Speech to Text model and interaction terms

These name the layers, model variants, and packaged products in the STT decision tree. See `product-architecture.md` for how the product is structured; this section governs only the words and their casing.

### Structural level names

| Level | Canonical name | Formerly | Notes |
|---|---|---|---|
| L2 | interaction pattern | — | Lowercase. Its values are lowercase: streaming, agent STT, pre-recorded. |
| L3 | model variant | Model | Lowercase common noun. Named variants (Standard, Enhanced, Melia 1, Linden 1) are capitalized. |
| L4 | model sub-variant | Modification | Lowercase common noun. A separately trained, sector-specific extension of a parent model variant, not a standalone model. |

### Model variants and packaged products

| Canonical form | Do not use | Notes |
|---|---|---|
| Melia 1 | Melia-1, melia 1, Melia | Model variant. Space, no hyphen. The `model` config/API value is `melia-1` (hyphenated, lowercase) — use that form only in code, config, and API references. Multilingual; Batch only today. |
| Linden 1 | Linden-1, linden 1 | Model variant for the agent STT interaction pattern. Coming soon. |
| Medical | medical domain, Medical domain | Model sub-variant of Enhanced. Capitalized when naming the sub-variant or a product (Batch Enhanced Medical); lowercase as an ordinary adjective ("medical transcription"). |
| Agent STT Linden 1 | Agent Transcription API, Agent Transcription API v1 | Packaged product: agent STT on the Linden 1 model variant. Coming soon. |

Standard and Enhanced are also model variants; their casing is in Canonical product and API names above.

### Interaction patterns

| Canonical form | Do not use | Notes |
|---|---|---|
| streaming | Streaming | Interaction pattern. Lowercase, except at the start of a sentence. |
| pre-recorded | Pre-recorded, prerecorded | Interaction pattern. Lowercase, hyphenated. |
| agent STT | Voice agent transcription, voice agent transcription, agent transcription | Interaction pattern on the Realtime API: the speech-to-text layer for building voice agents. Lowercase "agent", all-caps "STT". Capitalize "Agent" only at the start of a sentence or in the product name Agent STT Linden 1. Coming soon. |

Speechmatics does not sell a "voice agent." A voice agent is a full conversational pipeline (STT + LLM + STT) and is a distinct concept Speechmatics does not offer. agent STT provides the STT layer only, for developers building voice agents. Never describe a Speechmatics product as a "voice agent."

---

## Common terms and preferred forms

| Preferred form | Do not use | Notes |
|---|---|---|
| on-prem | on-premise | Preferred short form. "On-premises" is acceptable only when the topic warrants an explicit description. Never "on-premise." |
| on-device | On-device, on device | Deployment method. Lowercase, hyphenated. Coming soon; feature coverage is currently narrower than SaaS on Cloud and on-prem. |
| SaaS on Cloud | SaaS on cloud, cloud SaaS | Named cloud deployment surface. "SaaS" all-caps, "Cloud" capitalized. The exception to the lowercase deployment-method rule. |
| container deployment | Container deployment | Lowercase. A deployment method, not a product name. |
| virtual appliance | Virtual Appliance | Lowercase. A deployment method, not a product name. |
| portal | Portal | The self-service console at portal.speechmatics.com where users manage API keys, usage, and billing. Lowercase unless starting a sentence. |
| diarization | diarisation | en-US spelling. Lowercase. |
| speaker diarization | Speaker Diarization | Lowercase as a noun phrase. |
| channel diarization | Channel Diarization | Lowercase as a noun phrase. |
| WebSocket | Websocket, websocket, web socket | Capital W and S. |
| API key | api key, API Key | Lowercase "key." |
| JSON | json | All-caps. |
| REST | rest | All-caps. |
| SDK | sdk | All-caps. |
| job | Job | Lowercase common noun. |
| transcript | Transcript | Lowercase unless starting a sentence. |

---

## Feature and concept terms

Customer-facing features and concepts that appear in the docs. Lowercase as common noun phrases unless starting a sentence. Each has a dedicated page or section; link on first use rather than redefining inline.

| Preferred form | Do not use | Notes |
|---|---|---|
| translation | Translation | Lowercase. Converting transcript output into a target language. |
| speaker identification | Speaker Identification | Lowercase. Distinct from speaker diarization: identification labels known speakers; diarization separates unknown ones. |
| custom dictionary | Custom Dictionary | Lowercase. Adds words to the recognition vocabulary for a given input. |
| audio events | Audio Events | Lowercase. Non-speech sounds (such as laughter or music) labeled in the transcript. |
| audio filtering | Audio Filtering | Lowercase. |
| language pack | Language Pack, languagepack | Lowercase. The model assets for a given language. |
| language identification | Language Identification, LID | Lowercase. Define on first use if abbreviating; prefer the full form. |
| feature discovery | Feature Discovery | Lowercase. The endpoint returning current capability metadata. |
| smart formatting | numeral formatting, Smart Formatting | Lowercase. The feature that converts spoken entities (numbers, dates, currencies, times, measurements, and more) into their written form. Avoid "numeral formatting": it is too narrow, implying numbers only and excluding non-numeric entity classes such as dates, times, and email addresses. |
| entity | Entity | Lowercase. A spoken value with a conventional written form (a number, date, currency, time, measurement, and so on) that smart formatting detects and converts. `enable_entities` exposes each entity's structure in the JSON output. |

---

## Speech recognition terms

| Preferred form | Do not use | Notes |
|---|---|---|
| ASR | asr | All-caps. Industry term for the underlying technology. In user-facing content, prefer "Speech to Text" when naming the Speechmatics product; use ASR only when referring to the general technology or matching an established external term. |
| WER (Word Error Rate) | wer, word error rate (undefined) | All-caps abbreviation. Define on first use: full term followed by the abbreviation in parentheses. The standard accuracy metric; can exceed 100% because insertions are counted. |
| accuracy | Accuracy | Lowercase common noun. A characteristic of a model, not a tier or product. Not a synonym for WER: accuracy reflects the reader's overall experience (recognition, punctuation, formatting, diarization), whereas WER measures recognition only. |

---

## Abbreviations

Define an abbreviation on first use: full term followed by the abbreviation in parentheses. Use only the abbreviation for all subsequent references on the same page.

❌ Speech to Text converts audio to text. Speechmatics offers Speech to Text via the Realtime and Batch APIs.
✅ Speech to Text (STT) converts audio to text. Speechmatics offers STT via the Realtime and Batch APIs.

Do not define abbreviations more recognizable than their expanded form: API, JSON, SDK, REST, WebSocket.

---

## Terms not used in user-facing content

Do not use internal codenames, deprecated product names, or internal system names in user-facing content. If you are unsure whether a term is internal, check with the docs platform owners before using it.

Example: legacy platform names such as "V1 SaaS" or "AWS SaaS" must not appear. Use the current product surface name instead.

### Deprecated: Flow

"Flow" (and the lowercase "flow" when used as the product or feature name) referred to a standalone voice agent product and API that has been removed from the Speechmatics offering. It is deprecated and must not be documented, referenced, or reintroduced in any user-facing content.

If "Flow" appears in the codebase, existing docs, release notes, or source material, treat it as a deprecated reference: remove it rather than carrying it forward. Where the surrounding content still needs a conversational speech-to-text reference, point to agent STT — the interaction pattern on the Realtime API that provides the speech-to-text layer for building voice agents (see `product-architecture.md`). Do not carry Flow's framing forward: Speechmatics does not sell a "voice agent" (a full STT + LLM + STT pipeline), so never describe agent STT, or any Speechmatics product, as a voice agent.

This rule targets the product/feature named Flow. It does not apply to ordinary uses of the word in phrases such as "authentication flow" or "data flow", which are unaffected.
