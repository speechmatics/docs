---
title: Deployments — Overview
description: 'Learn about the different ways to use our APIs, including cloud services and on-prem containers.'
---

# Overview

## Cloud

Leverage Speechmatics’ cloud services for easy, scalable, and fully managed speech-to-text and translation capabilities.

The best way to get started using Speechmatics' cloud services is:
- Create an account in our [Portal](https://portal.speechmatics.com/)
- Check out our [Realtime Transcription](/speech-to-text/realtime/quickstart.mdx)
- Check out our [Batch Transcription](/speech-to-text/batch/quickstart.mdx)

## On-prem

Deploy Speechmatics services in your own environment using containers. This option provides maximum control over your deployment and data.

- [CPU Speech-to-Text Container](/deployments/container/cpu-speech-to-text): Deploy the Speechmatics speech-to-text engine as a containerized service on your own hardware.
- [Language ID Container](/deployments/container/language-id): Identify the language spoken in your audio using the Language ID container.
- [Translation Container](/deployments/container/gpu-translation): Translate audio from one language to another using the Translation container.


## Feature Availability

Feature availability varies depending on the deployment method you choose. Below is a table summarizing the speech to text feature availability for each deployment method and processing mode.

| Feature | Modes | Deployments |
|-----------------------------------------------|----------------------|----------------------------|
| [Multi-lingual speech to text](/speech-to-text/languages#multilingual-speech-to-text) | Batch, Realtime | SaaS, On-prem |
| [Alignment](/speech-to-text/batch/alignment) | Batch | SaaS |
| [Audio Events](/speech-to-text/features/audio-events) | Batch, Realtime | SaaS, On-prem |
| [Audio Filtering](/speech-to-text/features/audio-filtering) | Batch, Realtime | SaaS, On-prem |
| [Auto Chapters](/speech-to-text/batch/speech-intelligence/auto-chapters) | Batch | SaaS |
| [Custom Dictionary](/speech-to-text/features/custom-dictionary) | Batch, Realtime | SaaS, On-prem |
| [Diarization](/speech-to-text/features/diarization) | Batch, Realtime | SaaS, On-prem |
| [Disfluencies and Word Replacement](/speech-to-text/formatting#disfluencies) | Batch, Realtime | SaaS, On-prem |
| [End-of-Turn](/speech-to-text/realtime/end-of-turn) | Realtime | SaaS, On-prem |
| [Feature Discovery](/speech-to-text/features/feature-discovery) | Batch, Realtime | SaaS |
| [Fetch URL](/speech-to-text/batch/input#fetch-url) | Batch | SaaS, On-Prem |
| [Language Identification](/speech-to-text/batch/language-identification) | Batch | SaaS |
| [Notifications](/speech-to-text/batch/notifications.md) | Batch | SaaS, On-prem |
| [Numeral Formatting](/speech-to-text/formatting#smart-formatting) | Batch, Realtime | SaaS, On-prem |
| [Punctuation Settings](/speech-to-text/formatting#punctuation) | Batch, Realtime | SaaS, On-prem |
| [Sentiment Analysis](/speech-to-text/batch/speech-intelligence/sentiment-analysis) | Batch | SaaS, On-prem |
| [Summarization](/speech-to-text/batch/speech-intelligence/summarization) | Batch | SaaS |
| [Topic Detection](/speech-to-text/batch/speech-intelligence/topic-detection) | Batch | SaaS |
| [Tracking](/speech-to-text/batch/output#tracking-metadata) | Batch, Realtime | SaaS, On-prem |
| [Translation](/speech-to-text/features/translation) | Batch, Realtime | SaaS, On-prem |
