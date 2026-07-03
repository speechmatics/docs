# Product architecture

This file describes the Speechmatics applied product architecture for use as project context. Use it to ensure accuracy when writing or reviewing docs.

Last updated: 3 July 2026.

---

## Speech to Text

STT is structured as a layered decision tree. Each layer resolves one choice, taking the reader from the general API down to a specific packaged product, with deployment as an orthogonal final choice.

The layers are: API, processing mode, interaction pattern, model variant, model sub-variant, packaging, and deployment.

### Level 0: API

One STT API: **Speech to Text**.

### Level 1: Processing mode

How the API is consumed.

- **Realtime** (streaming; persistent WebSocket; transcripts arrive as the audio plays)
- **Batch** (asynchronous; audio submitted as a file, transcript returned when ready)

### Level 2: Interaction pattern

How audio is presented to the API for processing. Available patterns depend on the processing mode.

- Realtime: **streaming** (from live audio input), **agent STT** (turn-based, from live audio input; coming soon)
- Batch: **pre-recorded** (file-based, asynchronous or synchronous using long-polling)

agent STT is an interaction pattern on the Realtime API, purpose-built as the speech-to-text layer for voice-agent applications. It is coming soon. See "Notes for writers" for the distinction between agent STT and a voice agent.

### Level 3: Model variant

The model used to transcribe. Available model variants depend on the interaction pattern.

- streaming: **Standard**, **Enhanced**
- agent STT: **Linden 1** (coming soon)
- pre-recorded: **Standard**, **Enhanced**, **Melia 1**

Notes:
- Standard prioritizes turnaround and cost; Enhanced prioritizes accuracy.
- Melia 1 is multilingual: no language pack selection, and it requires `"language": "multi"`. Batch only today.

### Level 4: Model sub-variant

A separately trained, use-case- or sector-specific extension of a parent model variant. A sub-variant is more than a packaging label, but it is not a standalone model variant of its own — it depends on its parent.

- **Medical**: tuned for medical use cases. Available on Enhanced (both streaming and pre-recorded).
- Most model variants have no sub-variant.

### Level 5: Packaging

The packaged product a customer selects and contracts against. These are the names currently in use.

| Processing mode | Interaction pattern | Model variant | Model sub-variant | Current product name |
|---|---|---|---|---|
| Realtime | streaming | Standard | — | Realtime Standard |
| Realtime | streaming | Enhanced | — | Realtime Enhanced |
| Realtime | streaming | Enhanced | Medical | Realtime Enhanced Medical |
| Realtime | agent STT | Linden 1 | — | Agent STT Linden 1 (coming soon) |
| Batch | pre-recorded | Standard | — | Batch Standard |
| Batch | pre-recorded | Enhanced | — | Batch Enhanced |
| Batch | pre-recorded | Enhanced | Medical | Batch Enhanced Medical |
| Batch | pre-recorded | Melia 1 | — | Batch Melia 1 |

### Level 6: Deployment

Deployment is orthogonal to the layers above and applies to all packaged products: **SaaS on Cloud**, **on-prem**, and **on-device** (coming soon). See "Notes for writers" for on-device coverage.

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

- **Use current product names.** The packaging names in the table above (Realtime Standard, Batch Enhanced, and so on) are the names currently in use and the only ones to put in docs. A target naming scheme led by interaction pattern (streaming, pre-recorded) is anticipated but not live. Do not preempt the rename or mix the two schemes in a page.
- **STT and TTS are separate product lines.** They share the API-at-top pattern but their mid-level semantics differ. STT Level 1 is processing mode; TTS Level 1 is model. Do not assume a uniform level model across the two.
- **Model sub-variants live at Level 4**, between model variant and packaging. A sub-variant (such as Medical) is a separately trained extension of its parent model variant, tuned for a use case or sector — more than a packaging label, but dependent on its parent rather than a standalone model.
- **agent STT is an interaction pattern on the Realtime API for building voice agents.** It is coming soon, with model variant Linden 1 and packaged product Agent STT Linden 1. A *voice agent* is a full conversational pipeline (STT + LLM + STT) and is a distinct concept that Speechmatics does not sell. agent STT provides the STT layer only. Never describe a Speechmatics product as a "voice agent."
- **Melia 1 is multilingual and Batch only today.** It requires `"language": "multi"` and has no language pack selection.
- **Deployment is an orthogonal axis.** SaaS on Cloud and on-prem are the current surfaces. On-device is coming soon and its feature coverage is currently narrower than Cloud and on-prem; check current documentation before describing on-device support.
- **The decision tree is a guide, not a strict path.** A reader's product selection may skip layers.
