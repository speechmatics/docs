# Product architecture

This file describes the Speechmatics applied product architecture for use as project context. Use it to ensure accuracy when writing or reviewing docs.

Last updated: 22 June 2026.

---

## Speech to Text

STT is structured as a layered decision tree. Each layer resolves one choice, taking the reader from the general API down to a specific packaged product, with deployment as an orthogonal final choice.

The layers are: API, processing mode, interaction pattern, model, modification, packaging, and deployment.

### Level 0: API

One STT API: **Speech to Text**.

### Level 1: Processing mode

How the API is consumed.

- **Realtime** (streaming; persistent WebSocket; transcripts arrive as the audio plays)
- **Batch** (asynchronous; audio submitted as a file, transcript returned when ready)

### Level 2: Interaction pattern

How audio is presented to the API for processing. Available patterns depend on the processing mode.

- Realtime: **Streaming** (from live audio input), **Voice agent transcription** (turn-based, from live audio input)
- Batch: **Pre-recorded** (file-based asynchronous or synchronous using long-polling)

Voice agent transcription is delivered as a profile on the Realtime API, surfaced via sub-URL routing. It is not a separate API and not a separate model.

### Level 3: Model

The model used to transcribe. Available models depend on the interaction pattern.

- Streaming: **Standard** (language packs architecture), **Enhanced** (language packs architecture)
- Voice agent transcription: an Enhanced-backed conversational model variant
- Pre-recorded: **Standard** (language packs architecture), **Enhanced** (language packs architecture), **Melia 1** (multilingual architecture)

Notes:
- Standard and Enhanced are operating points on the Ursa-2 model architecture. Standard prioritises turnaround and cost; Enhanced prioritises accuracy.
- Melia 1 is the first model on the AED (Attention-based Encoder-Decoder) architecture. It is multilingual: no language pack selection, and it requires `"language": "multi"`. Batch only today; Realtime on the roadmap.
- Variant names are generation-scoped. There is no "Standard AED" or "Enhanced AED". Future AED-architecture models will have their own variant names.

### Level 4: Modification

An optional adjustment applied to a model for a use case or sector. Modifications are packaging components, not new models.

- **Medical domain**: bundled configuration tuned for medical use cases. Available on Enhanced (both Streaming and Pre-recorded).
- Most configurations have no modification.

### Level 5: Packaging

The packaged product a customer selects and contracts against. These are the names currently in use.

| Processing mode | Interaction pattern | Model | Modification | Current product name |
|---|---|---|---|---|
| Realtime | Streaming | Standard | — | Realtime Standard |
| Realtime | Streaming | Enhanced | — | Realtime Enhanced |
| Realtime | Streaming | Enhanced | medical domain | Realtime Medical |
| Realtime | Voice agent transcription | Enhanced-backed variant | — | Agent Transcription API v1 |
| Batch | Pre-recorded | Standard | — | Batch Standard |
| Batch | Pre-recorded | Enhanced | — | Batch Enhanced |
| Batch | Pre-recorded | Enhanced | medical domain | Batch Medical |
| Batch | Pre-recorded | Melia 1 | — | Batch Melia-1 |

### Level 6: Deployment

Deployment is orthogonal to the layers above and applies to all packaged products: **SaaS on Cloud** and **on-prem**. See "Notes for writers" for On-device.

---

## Text to Speech

TTS is a separate product line. It has three customer-facing levels.

### Level 0: API

One TTS API.

### Level 1: Model

Current TTS model.

### Level 2: Voices

The model ships with four English voices:

- Sarah
- Theo
- Jack
- Megan

---

## Notes for writers

- **Use current product names.** The packaging names in the table above (Realtime Standard, Batch Enhanced, and so on) are the names currently in use and the only ones to put in docs. A target naming scheme led by interaction pattern (Streaming, Pre-recorded) is anticipated but not live. Do not pre-empt the rename or mix the two schemes in a page.
- **STT and TTS are separate product lines.** They share the API-at-top pattern but their mid-level semantics differ. STT Level 1 is processing mode; TTS Level 1 is model. Do not assume a uniform level model across the two.
- **Modifications live at Level 4**, between model and packaging. They are packaging on top of an existing model, not separately trained models.
- **Voice agent transcription is an interaction pattern on the Realtime API**, delivered as a profile via sub-URL routing. It is not a separate API and not a separate model. The current docs surface it under Voice agents.
- **Melia 1 is multilingual and Batch only today.** It requires `"language": "multi"` and has no language pack selection.
- **Deployment is an orthogonal axis.** SaaS on Cloud and on-prem are the current surfaces. On-device exists but its feature coverage is currently narrower than Cloud and on-prem, and parts are not yet generally available; check current documentation before describing On-device support.
- **The decision tree is a guide, not a strict path.** A reader's product selection may skip layers.
