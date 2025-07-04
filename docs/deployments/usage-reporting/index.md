---
sidebar_position: 0
---

# Usage Reporting

## What data Do We Record?

:::info

We will never attempt to send customer audio data over the network. We only record metadata about what our transcriber is doing.

:::

We aim to be completely transparent about the kind of data we record. In future releases, we may improve our service by recording additional technical data in relation to the operation of the transcriber. This will not include sensitive customer data, such as audio files or transcripts.

### Data We Record:

- Audio duration information to accurately calculate billing
- Customer information including: Contract ID, Customer name and License ID
- Summary of job configuration information, excluding any potentially sensitive information such as Custom Dictionary content
- Audio information such as codec and format type
- System information, including certain error events

We record events about what the transcriber is doing as small JSON objects. Here is an example of the kind of data we send:

```json
{
  "container_id": "aee112010359",
  "contract_id": "0",
  "customer_id": "Speechmatics",
  "engine_instance_id": "930ab901-c408-457d-9f6d-dee21ecaac7f",
  "event": "TRANSCRIBER_DONE",
  "event_specific_data": {
    "bit_rate": "512000",
    "build_id": "",
    "channels": 2,
    "codec_name": "pcm_s16le",
    "file_metadata": {},
    "format_name": "wav",
    "inference": "cpu",
    "job_config": {
      "transcription_config": {
        "language": "en"
      },
      "type": "transcription"
    },
    "license_id": "b6616911c59c40cbbb32ebf442696a14",
    "rtf": 1.975401759147644,
    "sample_rate": "16000",
    "total_received_bytes": 149562,
    "total_received_duration": 2,
    "total_speech_duration": 2
  },
  "session_id": "a29bd398-5745-43ca-9d16-07cdc6eabdd0",
  "source": "uniasr-batch",
  "time_stamp": "2022-09-14T13:01:13.239Z"
}
```