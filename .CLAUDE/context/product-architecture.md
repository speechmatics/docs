# Product architecture

Updated: 10 Aug 2026

This file describes the Speechmatics applied product architecture for use as project context. Use it to check accuracy when writing or reviewing docs.

This file describes **structure only**: which entities exist, at which level, and under which name. It holds no availability values. Which features, add-ons, and regions are available for a given combination, and how ready that combination is, is in `feature-availability.md`.

Written in en-US, matching the docs style guide.

---

## Two views of the same product

Speech to Text is described in two ways, for two different readers. Both are correct. Neither is a subset of the other.

**API view.** Batch and Realtime are the only processing modes: the transport details for accessing the service. This is the vocabulary of the API reference and the SDKs.

**Product view.** Three interaction patterns describe how audio is presented for processing. This is the vocabulary for onboarding and explanation, and it exists because "batch" is a poor descriptor of what the Batch API actually does.

This crosswalk is the authoritative mapping between the naming systems in use.

| Interaction pattern | Processing mode | Transport | `session_type` |
|---|---|---|---|
| pre-recorded | Batch | REST API | `batch` |
| streaming | Realtime | WebSocket API | `realtime` |
| agent STT | Realtime | WebSocket API | `agent` |

`session_type` is a field on the usage endpoint. Its values name interaction patterns, not processing modes: `realtime` means streaming, and agent STT has its own value, `agent`. Do not read `realtime` as covering all Realtime traffic.

---

## Speech to Text

Speech to Text resolves through six levels, each answering one question.

### Level 0: Service

One service: **Speech to Text**.

### Level 1: Interaction pattern

How audio is presented for processing.

- **pre-recorded**: file-based, asynchronous, or synchronous using long-polling
- **streaming**: from live audio input
- **agent STT**: turn-based, from live audio input

Processing mode, transport, and `session_type` are attributes of the interaction pattern, fixed by the choice of pattern rather than selected separately. See the crosswalk above.

### Level 2: Model

The model used to transcribe. Available models depend on the interaction pattern.

- pre-recorded: **Standard**, **Enhanced**, **Melia 1**
- streaming: **Standard**, **Enhanced**, **Melia 1**
- agent STT: **Linden 1**

**Features** are the characteristics, capabilities, and parameters of a model in a given interaction pattern. They are attributes of this level, not a level of their own: a feature has no meaning independent of the model and pattern it applies to, and its availability varies again by deployment. Values are in `feature-availability.md`.

### Level 3: Add-ons

Outputs derived from a completed transcript, selected in addition to transcription.

- Translation
- Chapters
- Topics
- Summaries
- Sentiment
- Audio alignment

Add-ons are a level rather than an attribute because each produces a new output computed from the transcript, whereas a feature conditions the input or shapes the transcript itself. Chargeability is not the classifier.

Availability varies by interaction pattern, model, and deployment, and is in `feature-availability.md`.

### Level 4: Packaging

The packaged product a customer selects and contracts against. These are the names currently in use.

| Interaction pattern | Model | Current product name |
|---|---|---|
| pre-recorded | Standard | Batch Standard |
| pre-recorded | Enhanced | Batch Enhanced |
| pre-recorded | Melia 1 | Batch Melia 1 |
| streaming | Standard | Realtime Standard |
| streaming | Enhanced | Realtime Enhanced |
| streaming | Melia 1 | Realtime Melia 1 |
| agent STT | Linden 1 | Agent STT Linden 1 |

Packaging names are led by processing mode, not interaction pattern. There are no packaged products for individual features or add-ons.

### Level 5: Deployment

Deployment is orthogonal to the levels above and applies to all packaged products.

- **SaaS on Cloud**: Speechmatics-hosted
- **on-prem**: container deployment or virtual appliance
- **on-device**: in development. Feature coverage is narrower than SaaS on Cloud and on-prem; check current documentation before describing on-device support.

**Region** is an attribute of SaaS on Cloud only. The named regions are EU, US, and AUS. On-prem and on-device are customer-hosted, so regions do not apply to them. Which regions serve which pattern and model is in `feature-availability.md`.

---

## Access surfaces

How a developer reaches the service, orthogonal to the six levels in the same way deployment is. Any access surface can call any packaged product it supports.

- **APIs**: the Batch and Realtime APIs directly.
- **SDKs**: Speechmatics-maintained libraries wrapping the APIs, per surface and language.
- **Integrations**: third-party platforms with Speechmatics built in, such as voice agent orchestrators and no-code automation tools.

Access surfaces do not change what a product does or where it runs. Names are in `terminology.md`.

---

## Text to Speech

TTS is a separate product line. It has three customer-facing levels.

### Level 0: Service

One service: Text to Speech.

### Level 1: Model

Current TTS model.

### Level 2: Voices

The model ships with four English voices: Sarah, Theo, Jack, and Megan.

---

## Notes for writers

- **Use current packaging names.** The names in the Level 4 table are the only ones to put in docs. A naming scheme led by interaction pattern is anticipated but not live. Do not preempt the rename or mix the two schemes on one page.
- **Do not replace Batch and Realtime in reference content.** They are the only processing modes and they are entrenched in the API reference and the SDKs, including client names such as `BatchClient`. Reference content uses processing modes.
- **Use interaction patterns in explanation and onboarding content.** They exist to lower the entry barrier, because "batch" implies something different from what the Batch API does. Choose the vocabulary that matches the content type rather than mixing both in one section.
- **Medical is a feature, not a model.** Forbidden product-name variants are in `terminology.md`; which models offer the medical domain is in `feature-availability.md`.
- **agent STT is an interaction pattern, not a voice agent.** A voice agent is a full conversational pipeline (STT plus LLM plus TTS) and is a distinct concept that Speechmatics does not sell. agent STT provides the speech-to-text layer only. Never describe a Speechmatics product as a voice agent.
- **Do not assume a uniform level model across STT and TTS.** STT Level 1 is interaction pattern; TTS Level 1 is model.
