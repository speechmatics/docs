# Feature availability

Updated: 10 Aug 2026

Generated from the STT product catalogue. **Do not edit by hand**: regenerate when the catalogue changes.

Speech to Text availability values only: features, add-ons, regions, and readiness. Structure and naming are in `product-architecture.md`.

---

## What the tables contain

The tables mix three kinds of item, bundled together so availability can be read in one place. The Items section at the foot of this file states the kind of every item.

**Features** are characteristics, capabilities, and parameters of a model in an interaction pattern. They are configured within a transcription request.

**Add-ons are not features.** Each is a separate product bolted onto transcription, producing an output derived from a completed transcript, and each is documented on its own page rather than in a feature list. Do not describe an add-on as a feature, and do not fold add-ons into feature documentation. See Level 3 in `product-architecture.md`.

**Regions** are processing locations, an attribute of SaaS on Cloud only.

---

## Values

Availability depends on the combination of interaction pattern, model, and deployment. Check the combination, not the product name.

| Value | Meaning | Authoring rule |
|---|---|---|
| Yes | Available now | Document it |
| No | Not available, and not on the roadmap | Do not document. State "not supported" only where readers repeatedly ask |
| n/a | Does not apply to this combination | Do not document, and do not list it as a gap |
| Not yet | Not available, on the roadmap | Do not document |
| TBD | Availability not established | Do not document, and do not imply availability either way |

Rows that are n/a for every model in a table are omitted from that table.

---

## Readiness

Readiness is a separate question from availability: availability says whether something exists for a combination, readiness says whether that combination is usable and documentable.

| Value | Deployment | Meaning | Authoring rule |
|---|---|---|---|
| GA | SaaS on Cloud | Generally available | Document fully |
| Preview | SaaS on Cloud | Usable, with limitations | Document with an Info admonition: for evaluation and feedback, not production-ready and not ready to scale |
| Released | on-prem | Available from a stated container release | Document, naming the release |
| In development | either | Not available | Do not document. No feature lists, no page stubs |

Preview applies to SaaS on Cloud only, because on-prem ships as versioned containers: the question there is which release you need.

| Interaction pattern | Model | SaaS on Cloud | On-prem |
|---|---|---|---|
| pre-recorded | Standard | GA | Released |
| pre-recorded | Enhanced | GA | Released |
| pre-recorded | Melia 1 | GA | Released |
| streaming | Standard | GA | Released |
| streaming | Enhanced | GA | Released |
| streaming | Melia 1 | Preview | In development |
| agent STT | Linden 1 | Preview | In development |

---

## SaaS on Cloud

### Pre-recorded

| Item | Standard | Enhanced | Melia 1 |
|---|---|---|---|
| 56 languages | Yes | Yes | Yes |
| Mixed-language transcription | No | No | Yes |
| Language hints | No | No | Yes |
| Language labeling | No | No | Yes |
| Transcription language packs (including bilingual) | Yes | Yes | n/a |
| Automatic language identification | Yes | Yes | n/a |
| Custom dictionary | Yes | Yes | TBD |
| User context (prompting) | No | No | Not yet |
| Medical domain | No | Yes | Not yet |
| Output locale | Yes | Yes | Yes |
| Smart formatting | Yes | Yes | Yes |
| Entity detection (basic, legacy) | Yes | Yes | No |
| Entity detection (advanced) | TBD | TBD | Not yet |
| PII redaction | TBD | TBD | Not yet |
| Disfluency tagging | Yes | Yes | Not yet |
| Profanity tagging | Yes | Yes | Not yet |
| Text replacement (find and replace) | Yes | Yes | Not yet |
| Punctuation and casing | Yes | Yes | Yes |
| Timings, word-level | Yes | Yes | Yes |
| Timings, segment-level | Yes | Yes | Yes |
| Confidence scores | Yes | Yes | No |
| Speaker diarization | Yes | Yes | Yes |
| Channel diarization | Yes | Yes | Yes |
| Speaker identification | Yes | Yes | Not yet |
| Audio events | Yes | Yes | No |
| Audio filtering (volume filtering) | Yes | Yes | Not yet |
| Fetch URL | Yes | Yes | Yes |
| App usage tracking | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes |
| Translation | Yes | Yes | No |
| Chapters | Yes | Yes | No |
| Topics | Yes | Yes | No |
| Summaries | Yes | Yes | No |
| Sentiment | Yes | Yes | No |
| Audio alignment | Yes | Yes | No |
| EU | Yes | Yes | Yes |
| US | Yes | Yes | Yes |
| AUS | Yes | Yes | No |

### Streaming

| Item | Standard | Enhanced | Melia 1 |
|---|---|---|---|
| 56 languages | Yes | Yes | Yes |
| Mixed-language transcription | No | No | Yes |
| Language hints | No | No | Not yet |
| Language labeling | No | No | Yes |
| Transcription language packs (including bilingual) | Yes | Yes | n/a |
| Automatic language identification | No | No | n/a |
| Custom dictionary | Yes | Yes | TBD |
| User context (prompting) | No | No | Not yet |
| Medical domain | No | Yes | Not yet |
| Output locale | Yes | Yes | Yes |
| Smart formatting | Yes | Yes | Yes |
| Entity detection (basic, legacy) | Yes | Yes | No |
| Entity detection (advanced) | TBD | TBD | TBD |
| PII redaction | TBD | TBD | TBD |
| Disfluency tagging | Yes | Yes | Not yet |
| Profanity tagging | Yes | Yes | Not yet |
| Text replacement (find and replace) | Yes | Yes | Not yet |
| Punctuation and casing | Yes | Yes | Yes |
| Timings, word-level | Yes | Yes | Yes |
| Timings, segment-level | No | No | TBD |
| Confidence scores | Yes | Yes | No |
| Speaker diarization | Yes | Yes | Not yet |
| Channel diarization | Yes | Yes | Yes |
| Speaker identification | Yes | Yes | Not yet |
| Audio events | Yes | Yes | No |
| Audio filtering (volume filtering) | Yes | Yes | Not yet |
| Force end of utterance | Yes | Yes | Not yet |
| Voice activity detection (VAD) | No | No | No |
| Turn detection | Yes | Yes | No |
| Partials, word-level | Yes | Yes | Yes |
| Partials, segment-level | No | No | No |
| Translation | Yes | Yes | No |
| Chapters | No | No | No |
| Topics | No | No | No |
| Summaries | No | No | No |
| Sentiment | No | No | No |
| Audio alignment | No | No | No |
| EU | Yes | Yes | Yes |
| US | Yes | Yes | Yes |
| AUS | No | No | No |

### Agent STT

| Item | Linden 1 |
|---|---|
| 56 languages | Yes |
| Mixed-language transcription | No |
| Language hints | No |
| Language labeling | No |
| Transcription language packs (including bilingual) | Yes |
| Automatic language identification | No |
| Custom dictionary | Yes |
| User context (prompting) | No |
| Medical domain | Yes |
| Output locale | Yes |
| Smart formatting | Yes |
| Entity detection (basic, legacy) | No |
| Entity detection (advanced) | TBD |
| PII redaction | TBD |
| Disfluency tagging | No |
| Profanity tagging | No |
| Text replacement (find and replace) | Yes |
| Punctuation and casing | Yes |
| Timings, word-level | No |
| Timings, segment-level | Yes |
| Confidence scores | No |
| Speaker diarization | Yes |
| Channel diarization | No |
| Speaker identification | Yes |
| Audio events | No |
| Audio filtering (volume filtering) | No |
| Force end of utterance | Not yet |
| Voice activity detection (VAD) | Yes |
| Turn detection | Yes |
| Partials, word-level | No |
| Partials, segment-level | Yes |
| Translation | No |
| Chapters | No |
| Topics | No |
| Summaries | No |
| Sentiment | No |
| Audio alignment | No |
| EU | Yes |
| US | Yes |
| AUS | No |


---

## On-prem

### Pre-recorded

| Item | Standard | Enhanced | Melia 1 |
|---|---|---|---|
| 56 languages | Yes | Yes | Yes |
| Mixed-language transcription | No | No | Yes |
| Language hints | No | No | Yes |
| Language labeling | No | No | Yes |
| Transcription language packs (including bilingual) | Yes | Yes | n/a |
| Automatic language identification | Yes | Yes | n/a |
| Custom dictionary | Yes | Yes | TBD |
| User context (prompting) | No | No | Not yet |
| Medical domain | No | Yes | Not yet |
| Output locale | Yes | Yes | Yes |
| Smart formatting | Yes | Yes | Yes |
| Entity detection (basic, legacy) | Yes | Yes | No |
| Entity detection (advanced) | TBD | TBD | Not yet |
| PII redaction | TBD | TBD | Not yet |
| Disfluency tagging | Yes | Yes | Not yet |
| Profanity tagging | Yes | Yes | Not yet |
| Text replacement (find and replace) | Yes | Yes | Not yet |
| Punctuation and casing | Yes | Yes | Yes |
| Timings, word-level | Yes | Yes | Yes |
| Timings, segment-level | Yes | Yes | Yes |
| Confidence scores | Yes | Yes | No |
| Speaker diarization | Yes | Yes | Yes |
| Channel diarization | Yes | Yes | Yes |
| Speaker identification | Yes | Yes | Not yet |
| Audio events | Yes | Yes | No |
| Audio filtering (volume filtering) | Yes | Yes | Not yet |
| Fetch URL | Yes | Yes | Yes |
| Notifications | No | No | No |
| Translation | Yes | Yes | No |
| Chapters | No | No | No |
| Topics | No | No | No |
| Summaries | No | No | No |
| Sentiment | Yes | Yes | No |
| Audio alignment | No | No | No |

### Streaming

| Item | Standard | Enhanced | Melia 1 |
|---|---|---|---|
| 56 languages | Yes | Yes | Not yet |
| Mixed-language transcription | No | No | Not yet |
| Language hints | No | No | Not yet |
| Language labeling | No | No | Not yet |
| Transcription language packs (including bilingual) | Yes | Yes | n/a |
| Automatic language identification | No | No | n/a |
| Custom dictionary | Yes | Yes | TBD |
| User context (prompting) | No | No | Not yet |
| Medical domain | No | Yes | Not yet |
| Output locale | Yes | Yes | Not yet |
| Smart formatting | Yes | Yes | Not yet |
| Entity detection (basic, legacy) | Yes | Yes | No |
| Entity detection (advanced) | TBD | TBD | TBD |
| PII redaction | TBD | TBD | TBD |
| Disfluency tagging | Yes | Yes | Not yet |
| Profanity tagging | Yes | Yes | Not yet |
| Text replacement (find and replace) | Yes | Yes | Not yet |
| Punctuation and casing | Yes | Yes | Not yet |
| Timings, word-level | Yes | Yes | Not yet |
| Timings, segment-level | No | No | TBD |
| Confidence scores | Yes | Yes | No |
| Speaker diarization | Yes | Yes | Not yet |
| Channel diarization | Yes | Yes | Not yet |
| Speaker identification | Yes | Yes | Not yet |
| Audio events | Yes | Yes | No |
| Audio filtering (volume filtering) | Yes | Yes | Not yet |
| Force end of utterance | Yes | Yes | Not yet |
| Voice activity detection (VAD) | No | No | No |
| Turn detection | Yes | Yes | No |
| Partials, word-level | Yes | Yes | Not yet |
| Partials, segment-level | No | No | No |
| Translation | Yes | Yes | No |
| Chapters | No | No | No |
| Topics | No | No | No |
| Summaries | No | No | No |
| Sentiment | No | No | No |
| Audio alignment | No | No | No |

### Agent STT

| Item | Linden 1 |
|---|---|
| 56 languages | Not yet |
| Mixed-language transcription | No |
| Language hints | No |
| Language labeling | No |
| Transcription language packs (including bilingual) | Not yet |
| Automatic language identification | No |
| Custom dictionary | Not yet |
| User context (prompting) | No |
| Medical domain | Not yet |
| Output locale | Not yet |
| Smart formatting | Not yet |
| Entity detection (basic, legacy) | No |
| Entity detection (advanced) | TBD |
| PII redaction | TBD |
| Disfluency tagging | No |
| Profanity tagging | No |
| Text replacement (find and replace) | Not yet |
| Punctuation and casing | Not yet |
| Timings, word-level | No |
| Timings, segment-level | Not yet |
| Confidence scores | No |
| Speaker diarization | Not yet |
| Channel diarization | No |
| Speaker identification | Not yet |
| Audio events | No |
| Audio filtering (volume filtering) | No |
| Force end of utterance | Not yet |
| Voice activity detection (VAD) | Not yet |
| Turn detection | Not yet |
| Partials, word-level | No |
| Partials, segment-level | Not yet |
| Translation | No |
| Chapters | No |
| Topics | No |
| Summaries | No |
| Sentiment | No |
| Audio alignment | No |

---

## Items

| Item | Kind | Category | Description |
|---|---|---|---|
| 56 languages | feature | Language coverage | The supported transcription language set. |
| Mixed-language transcription | feature | No language selection needed | Uses one unified multilingual model to identify each language and switch seamlessly between languages mid-sentence. No language selection. |
| Language hints | feature | No language selection needed | Optionally list the languages you expect in the audio to improve accuracy and switching. Does not restrict the model to those languages. |
| Language labeling | feature | No language selection needed | Tags the specific languages spoken in audio. |
| Transcription language packs (including bilingual) | feature | Choose the language | Choose the language you want transcribed, or a bilingual pack. |
| Automatic language identification | feature | Choose the language | Automatically detects the spoken language and selects the matching language pack. |
| Custom dictionary | feature | Output, tuning, and formatting | Boosts accuracy for names, acronyms and domain terms. |
| User context (prompting) | feature | Output, tuning, and formatting | Supply free-form or structured information unique to the customer or session: boost words (custom dictionary), custom phrases, free-text documents, or natural-language instructions on formatting and domain hinting. |
| Medical domain | feature | Output, tuning, and formatting | Tunes recognition for healthcare audio: procedures, medications, conditions and anatomy. |
| Output locale | feature | Output, tuning, and formatting | Standardizes output spelling for a locale (en-GB vs en-US). |
| Smart formatting | feature | Output, tuning, and formatting | Converts spoken entities (numbers, dates, currencies, email addresses, time, measurements) into properly formatted written text. |
| Entity detection (basic, legacy) | feature | Output, tuning, and formatting | Identifies key words and phrases and tags them with their category, using the built-in formatting entity classes. |
| Entity detection (advanced) | feature | Output, tuning, and formatting | Broader entity tagging across sensitive-information classes (PII, PHI, PCI). |
| PII redaction | feature | Output, tuning, and formatting | Removes sensitive words from the transcript based on their entity tag, for GDPR and HIPAA workflows. |
| Disfluency tagging | feature | Output, tuning, and formatting | Flags hesitations and filler words such as “umm” in the transcript. |
| Profanity tagging | feature | Output, tuning, and formatting | Flags profanity in the transcript so it can be displayed or filtered differently. |
| Text replacement (find and replace) | feature | Output, tuning, and formatting | Replaces matched words or phrases in the transcript with your own wording. |
| Punctuation and casing | feature | Output, tuning, and formatting | Punctuates and capitalizes the transcript. |
| Timings, word-level | feature | Output, tuning, and formatting | Per-word start and end timestamps. |
| Timings, segment-level | feature | Output, tuning, and formatting | Start and end timestamps for each transcript segment. |
| Confidence scores | feature | Output, tuning, and formatting | Per-word confidence to speed human review. |
| Speaker diarization | feature | Transcription separation and speakers | Separates and labels speakers it has not seen before. |
| Channel diarization | feature | Transcription separation and speakers | Processes multiple audio channels separately. |
| Speaker identification | feature | Transcription separation and speakers | Labels known speakers across recordings. |
| Audio events | feature | Audio input | Labels non-speech sounds: laughter, applause, music. |
| Audio filtering (volume filtering) | feature | Audio input | Pre-processes input audio to remove low-volume background speech which might otherwise be detected and transcribed. |
| Fetch URL | feature | Audio input | Provides audio file for pre-recorded (Batch) job from a URL. |
| Force end of utterance | feature | Responding | Ends the current utterance on demand so the final transcript is returned without waiting for a natural pause. |
| Voice activity detection (VAD) | feature | Responding | Signals when speech starts and stops, as an acoustic indicator independent of the transcript. |
| Turn detection | feature | Responding | Detects the end of a speaker turn for responsive conversational apps. |
| Partials, word-level | feature | Responding | Interim transcripts emitted word by word while audio streams in, refined before the final. |
| Partials, segment-level | feature | Responding | Interim transcripts emitted as whole segments while audio streams in, refined before the final. |
| App usage tracking | feature | Operational | Returns app usage metadata in the API response, to attribute usage across applications. |
| Notifications | feature | Operational | Callbacks when a job completes. |
| Translation | add-on | Add-ons | Up to 5 target languages per job. 34 English-paired languages plus Norwegian Bokmål to Nynorsk. |
| Chapters | add-on | Add-ons | Splits audio into titled, summarized chapters. |
| Topics | add-on | Add-ons | Detects topics discussed, with timestamps. |
| Summaries | add-on | Add-ons | Auto-generated summary of the transcript. |
| Sentiment | add-on | Add-ons | Sentiment across the conversation. |
| Audio alignment | add-on | Add-ons | Aligns an existing transcript to audio timings. Enterprise only. |
| EU | region | Regions | European Union processing region. |
| US | region | Regions | United States processing region. |
| AUS | region | Regions | Australia processing region. |
