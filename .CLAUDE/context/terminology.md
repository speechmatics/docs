# Terminology and product naming

Updated: 10 Aug 2026

Canonical names, casing, and forbidden variants for every term in the Speechmatics docs.

This file governs words only. Product structure is in `product-architecture.md`. Availability values and feature descriptions are in `feature-availability.md`. Do not restate either here.

---

## Capitalization

Capitalize named services, APIs, models, and packaged products. Lowercase features, add-ons, capabilities, and deployment methods.

| ✅ Do | ❌ Don't |
|---|---|
| Submit a job to the Batch API. | Submit a job to the batch API. |
| The Standard model is recommended for most use cases. | The standard model is recommended for most use cases. |
| Enable speaker diarization. | Enable Speaker Diarization. |
| Set the medical domain. | Set the Medical Domain. |

"SaaS on Cloud" is the one capitalized deployment method.

---

## Canonical service, API, and product names

| Canonical form | Do not use |
|---|---|
| Speech to Text | Speech-to-Text, Speech-To-Text, STT (except after first-use definition) |
| Text to Speech | Text-to-Speech, Text-To-Speech, TTS (except after first-use definition) |
| Batch API | batch API |
| Realtime API | Real-time API, Real Time API, RT API |
| Speechmatics | SM, speechmatics |

### Packaged products

Canonical names are in `product-architecture.md`. Forbidden variants:

| Do not use | Use instead |
|---|---|
| Agent Transcription API | Agent STT Linden 1 |

---

## Structural level names

| Level | Canonical name | Notes |
|---|---|---|
| L1 | interaction pattern | Lowercase. Values: pre-recorded, streaming, agent STT. |
| L2 | model | Lowercase common noun. Named models are capitalized. |
| L3 | add-on | Lowercase. |

"Model variant" and "model sub-variant" are retired. Do not use either.

---

## Models

| Canonical form | Do not use | Notes |
|---|---|---|
| Standard | standard (when naming the model) | |
| Enhanced | enhanced (when naming the model) | |
| Melia 1 | Melia-1, melia 1, Melia | Config value `melia-1`, used only in code and API references. Requires `"language": "multi"` and has no language pack selection. |
| Linden 1 | Linden-1, linden 1 | Serves agent STT only. |

---

## Interaction patterns

| Canonical form | Do not use | Notes |
|---|---|---|
| pre-recorded | Pre-recorded, prerecorded | Lowercase, hyphenated. |
| streaming | Streaming | Lowercase except at the start of a sentence. |
| agent STT | agent transcription, voice agent transcription | Lowercase "agent", all-caps "STT". Capitalize "Agent" only at the start of a sentence or in the product name Agent STT Linden 1. |

Never write "voice agent" to describe a Speechmatics product. See `product-architecture.md` for why.

---

## `session_type`

A field on the usage endpoint. Values are lowercase code identifiers: `batch`, `realtime`, `agent`. The mapping to interaction patterns is in `product-architecture.md`.

Do not describe `realtime` as covering all Realtime traffic: it means streaming only.

---

## Deployment terms

| Preferred form | Do not use | Notes |
|---|---|---|
| SaaS on Cloud | SaaS on cloud, cloud SaaS | The exception to the lowercase rule. |
| on-prem | on-premise | "On-premises" only where the topic warrants it. Never "on-premise". |
| on-device | On-device, on device | Lowercase, hyphenated. |
| container deployment | Container deployment | A deployment method, not a product name. |
| virtual appliance | Virtual Appliance | A deployment method, not a product name. |
| region | Region | Lowercase. |

---

## Feature and add-on names

Lowercase as common noun phrases, sentence case in tables. Link on first use rather than redefining. Descriptions and availability are in `feature-availability.md`.

### Language

| Preferred form | Do not use |
|---|---|
| mixed-language transcription | multilingual transcription, code-switching transcription |
| language hints | language hinting |
| language labeling | language labelling |
| transcription language packs (including bilingual) | bilingual packs, language pack combinations |
| automatic language identification | LID, auto language detection |
| language pack | Language Pack, languagepack |

### Output, tuning, and formatting

| Preferred form | Do not use |
|---|---|
| custom dictionary | Custom Dictionary |
| user context | prompting, context prompting |
| medical domain | Medical, Medical Domain, medical model |
| output locale | Output Locale |
| smart formatting | numeral formatting, Smart Formatting |
| entity detection (basic, legacy) | legacy entities |
| entity detection (advanced) | advanced entities |
| PII redaction | pii redaction |
| disfluency tagging | disfluency removal |
| profanity tagging | profanity filtering |
| text replacement (find and replace) | word replacement |
| punctuation and casing | Punctuation and Casing |
| word-level timings, segment-level timings | timings word-level, timings segment-level |
| confidence scores | Confidence Scores |

### Speakers and audio

| Preferred form | Do not use |
|---|---|
| speaker diarization | Speaker Diarization, diarization per speaker |
| channel diarization | Channel Diarization, diarization per channel |
| speaker identification | Speaker Identification |
| audio events | Audio Events |
| audio filtering (volume filtering) | Audio Filtering |
| fetch URL | Fetch Url, fetch-url |

### Conversational

| Preferred form | Do not use |
|---|---|
| turn detection | Turn Detection |
| voice activity detection (VAD) | Voice Activity Detection (undefined) |
| force end of utterance | FEOU, Force End of Utterance |
| word-level partials, segment-level partials | partials word-level, partials segment-level |

Define VAD on first use, then use the abbreviation. Do not use FEOU in user-facing content. API message names keep their exact casing in code font: `EndOfUtterance`, `StartOfTurn`, `EndOfTurn`, `AddPartialSegment`.

### Operational and add-ons

| Preferred form | Do not use |
|---|---|
| app usage tracking | App Usage Tracking |
| notifications | Notifications, callbacks |
| translation | Translation |
| chapters | auto chapters, Auto Chapters |
| topics | topic detection |
| summaries | summarization |
| sentiment | sentiment analysis |
| audio alignment | alignment, forced alignment |

---

## Integrations and SDKs

Third-party names keep their own casing. Do not normalize them.

| Preferred form | Do not use |
|---|---|
| LiveKit | Livekit, Live Kit |
| Pipecat | PipeCat, Pipe Cat |
| Vapi | VAPI, vapi |
| Zapier | zapier |
| Voice SDK | voice sdk, VoiceSDK, Voice sdk |
| .NET | dotnet, DotNet, .Net |

Name an SDK by the surface it calls, then the language in parentheses: "Realtime (Python)", "Batch (JavaScript)". Do not invent a shorter form. Never state an SDK version in docs prose: versions belong in the repository.

---

## Platform organization terms

| Preferred form | Do not use | Notes |
|---|---|---|
| workspace | Workspace | Lowercase. A container for organizing work in the portal. |
| project | Project | Lowercase. A way of organizing work within a workspace, also exposed through the API. |
| management token | Management Token | Lowercase. |

---

## Speech recognition terms

| Preferred form | Do not use | Notes |
|---|---|---|
| ASR | asr | Use only for the general technology or an established external term. Prefer "Speech to Text" when naming the Speechmatics product. |
| WER (Word Error Rate) | wer, word error rate (undefined) | Define on first use. Can exceed 100% because insertions are counted. |
| accuracy | Accuracy | A characteristic of a model, not a tier. Not a synonym for WER. |
| diarization | diarisation | en-US spelling. |
| Mandarin | Chinese Mandarin, Mandarin Chinese | Locale names: Simplified Mandarin (`cmn-Hans`), Traditional Mandarin (`cmn-Hant`). |

---

## Other common terms

| Preferred form | Do not use |
|---|---|
| portal | Portal |
| API key | api key, API Key |
| WebSocket | Websocket, websocket, web socket |
| JSON, REST, SDK | json, rest, sdk |
| job | Job |
| transcript | Transcript |
| feature discovery | Feature Discovery |
| entity | Entity |

---

## Abbreviations

Define on first use: full term, then the abbreviation in parentheses. Use the abbreviation for all later references on the same page.

❌ Speech to Text converts audio to text. Speechmatics offers Speech to Text via the Realtime and Batch APIs.
✅ Speech to Text (STT) converts audio to text. Speechmatics offers STT via the Realtime and Batch APIs.

---

## Terms not used in user-facing content

Internal codenames, model architecture names, deprecated product names, and marketing-only constructs must not appear in docs.

| Do not use | Why | Use instead |
|---|---|---|
| Limina | Internal codename | entity detection (advanced) |
| Ursa, Ursa 2, AED | Internal model architecture names | Name the model: Standard, Enhanced, Melia 1, Linden 1 |
| Enhanced Medical, Batch Enhanced Medical, Realtime Enhanced Medical | Marketing constructs, not packaged products | Enhanced with the medical domain |
| V1 SaaS, AWS SaaS | Legacy platform names | SaaS on Cloud |
| Micro-Batch | Not a tracked interaction pattern | pre-recorded |

If you are unsure whether a term is internal, ask before using it. Do not add any term in this table to `custom-words.txt`: a dictionary entry invites use.

### Deprecated: Flow

Flow referred to a standalone voice agent product that has been removed from the Speechmatics offering. It must not be documented, referenced, or reintroduced. Where content still needs a conversational speech-to-text reference, point to agent STT.

This rule targets the product named Flow. Ordinary uses such as "authentication flow" or "data flow" are unaffected.
