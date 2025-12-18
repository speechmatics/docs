---
description: 'Learn how Speechmatics notifications work'
keywords:
  [
    speechmatics,
    features,
    notifications,
    webhook,
    callback,
    transcription,
    production,
    speech recognition,
    asr
  ]
---

# Notifications

Notifications allow users to be informed both as to the status of a job and to receive the output, without having to continuously poll the Speechmatics SaaS to check for the status of a job.

Speechmatics sends a notification to a web service that you control and specify in the configuration request. This is done once the job is done transcript is available.

## Egress IP allowlist for notifications

If you want to receive notifications from the Speechmatics SaaS, you need to enable access to (allowlist) the egress IP addresses for the relevant environments.

Here is a list of the egress IP addresses for each environment:

| Regions | IP Addresses                                                                 |
| ------- | ---------------------------------------------------------------------------- |
| EU1     | `40.74.41.91`, `52.236.157.154`, `40.74.37.0`, `20.73.209.153`, `20.73.142.44`|
| EU2     | `20.105.89.153`, `20.105.89.173`, `20.105.89.184`, `20.105.89.98`, `20.105.88.228`|
| US1     | `52.149.21.32`, `52.149.21.10`, `52.137.102.83`, `40.64.107.92`, `40.64.107.99`|
| US2     | `52.146.58.224`, `52.146.58.159`, `52.146.59.242`, `52.146.59.213`, `52.146.58.64`|
| AU1     | `20.248.249.20`, `20.248.249.47`, `20.248.249.181`, `20.248.249.119`, `20.248.249.164`|

## Notification call flow

The call flow for the notification method looks like this:

![Notification workflow](/img/callflow-notification.png)

Below are examples of a configuration that requests a `JSON-v2` transcript and the media file upon job completion:

## Notification configuration example

```json
{
  "type": "transcription",
  "transcription_config": {
    "language": "en"
  },
  "notification_config": [
    {
      "url": "https://collector.example.org/callback",
      "contents": ["transcript", "data"],
      "auth_headers": ["Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhb"]
    }
  ]
}
```

This configuration example assumes you have implemented a `/callback` endpoint on host `collector.example.org` that listens for POST requests containing Speechmatics transcripts. In this example requests are only accepted if the auth token `eyJ0eXAiOiJKV1QiLCJhb` is used (note this is the auth token that _your_ service accepts, _not_ the Speechmatics API Key).

## How to configure a notification

Here is the relevant information you can pass in a Notification request:

| Option       | Mandatory | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url          | Yes       | The web address where the notification will be sent. Up to 3xURLs are supported                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| auth_headers | No        | If required to successfully authenticate to your specified notification location                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| contents     | No        | There are multiple types of content that can be sent. Multiple attachments can be sent in multiple callbacks:<ul><li> `transcript`: The transcript in `json-v2` format</li> <li> `transcript.json-v2`: The transcript in `json-v2` format</li><li> `transcript.txt`: The Transcript in `txt` format </li><li> `transcript.srt`: The transcript in `srt` format </li><li> `data`: The media file provided in the job submission request </li><li> `jobinfo`: The configuration information used to submit the job. Also present in the transcript in `json-v2` format</li></ul> |
| method       | No        | POST and PUT HTTP Methods are supported. If none is specified, then POST is used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### Further notes

- If no content is requested as part of the notification, it will simply be an HTTP message containing the job ID and the status of the job
- In case of an error, only jobinfo will be send back
- Up to 3 URLs are supported in any request
- Multiple pieces of content can be sent as multiple attachments in one request, allowing any combination of the input(s) and output(s) of the job to be forwarded to another processing stage
- You can set up multiple notifications to different endpoints: for instance you can send a jobinfo notification to one service, and the transcript notification to another
- Callbacks with a single attachment will send the content item as the HTTP request body, rather than using multipart mode. This allows writing an individual item to an object store like Amazon S3
- `auth_headers` should be specified:
  - To satisfy authentication/authorization requirements for systems that do not support auth tokens in query parameters
  - To control behaviour of an object store or another existing service endpoint
- Multiple callbacks can be specified per job
  - This allows sending individual pieces of content to different URLs, e.g. to allow uploading the audio and transcript to an object store as distinct objects for a downstream workflow.
  - It allows sending arbitrary combinations of the inputs/outputs to multiple destinations, to support a fanout workflow

Callbacks will be invoked in parallel and so may complete in any order. If a downstream workflow depends on getting several items of content delivered as separate callbacks (e.g. uploaded as separate items to S3), then the downstream processing logic will need to be robust to the ordering of uploads and the possibility that only some might succeed.

To ensure that the callbacks you receive come from Speechmatics you can [Apply an Allowlist](#egress-ip-allowlist-for-notifications).

## Accepting the notification

You need to ensure that the service that you implement to receive the callback notification is capable of processing the Speechmatics transcript using the format that has been specified in the config JSON. When testing your integration you should check the error logs on your web service to ensure that notifications are being accepted and processed correctly.

The callback appends the job ID as a query string parameter with name `id`, as well as the status of the job. As an example, if the job ID is r6sr3jlzjj, you'd see the following POST request:

```
POST /callback?id=r6sr3jlzjj&status=success HTTP/1.1
Host: collector.example.org
```

The status query parameter has a number of possible values:

- `success` - if the job is processed successfully
- `error` - if something goes wrong with job processing
- `fetch_error` - if we fail to fetch a data file from a URL
- `trim_error` - if we fail to process the audio file prior to transcription

These statuses are not the same as the job status values.

The user agent is `Speechmatics-API/2.0`.

## Return MIME types

In the case that extra information is requested (e.g. transcript, data), this data will appear in the payload body and can take the below forms:

1. If only one of `transcript`, `transcript.json-v2` or `jobinfo` is requested, then the return type will be **application/json** with the payload being the requested json data
2. If only one of `transcript.srt` and `transcript.txt` is requested, the return type will be **text/plain**, with the payload containing the srt or text transcript as plain text
3. If `data` is requested, or two or more of any content fields are requested, the return type will be **multipart/form-data**

## Notification web server configuration

Once the submitted media file is transcribed, and the transcript file is available, the Speechmatics Batch SaaS will send the transcript file in an HTTP POST request to the client web server (customer's webserver) specified in the `notification_config` config object. If the Speechmatics Batch SaaS does not receive a 2xx response (that the request is successfully received, understood, or accepted) it will keep trying to send the file until it reaches the set timeout threshold.

If the client's webserver that has been set as the callback endpoint is not configured with a large enough size limit to receive the transcript file and original media file it will generate a 413 (Request Entity Too Large) response to the Speechmatics service. The Speechmatics Batch SaaS has not received a 2xx response it will continue to retry sending the file.

Users are recommended to check their webserver size limits to ensure they are adequate for the files that will be sent.

## Notification failure

If the Speechmatics Batch SaaS is unable to send a notification to the specified online location, the transcript is still available to directly retrieve via an API request. A user can retrieve failure information by making a GET /jobs/$JOBID request.

If the job has failed, there will be an additional `errors` element, which will show all failure messages Speechmatics Batch SaaS encountered when attempting to send notifications. Please note, there can be multiple failure attempts associated with one submitted job.

```json
{
  "job": {
    "config": {
      "fetch_data": {
        "url": "https://example.com/average-files/punctuation1.mp3"
      },
      "notification_config": [
        {
          "contents": ["transcript", "jobinfo"],
          "url": "https://example.com"
        }
      ],
      "transcription_config": {
        "language": "de"
      },
      "type": "transcription"
    },
    "created_at": "2021-07-19T09:02:17.283Z",
    "data_name": "",
    "duration": 4,
    "errors": [
      {
        "message": "Error in sending notification: unable to send notification: HTTPError: Post \"https://example.com/500?id=1uyo82b1bv&status=success\": context deadline exceeded (Client.Timeout exceeded while awaiting headers), retrying",
        "timestamp": "2021-07-19T09:04:11.080Z"
      },
      {
        "message": "Error in sending notification: unable to send notification: Response status: 500, retrying",
        "timestamp": "2021-07-19T09:04:26.619Z"
      },
      {
        "message": "Error in sending notification: unable to send notification: Response status: 500, retrying",
        "timestamp": "2021-07-19T09:04:47.090Z"
      },
      {
        "message": "unable to send notification: unable to send notification: Response status: 500",
        "timestamp": "2021-07-19T09:05:17.347Z"
      },
      {
        "message": "Sending notification failed",
        "timestamp": "2021-07-19T09:05:17.570Z"
      }
    ],
    "id": "1uyo82b1bv",
    "status": "done"
  }
}
```
