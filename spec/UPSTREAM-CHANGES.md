# Spec changes to make upstream

The Batch and Management API specs originate in another repo; this site copies
them into `spec/` and patches what it must with overlays
(`spec/<name>.overlay.yaml`). This file collates what should change at the
source, so the overlays can shrink and the copies here stop drifting.

When a change lands upstream, delete its entry here and the overlay action it
replaces.

## Management API (`spec/management-api-v3.yaml`)

The public spec is generated upstream (`make public-spec`), from the
Management Platform service's spec and an overlay for what the auth proxy
changes: it drops the non-public paths and the proxy's headers, adds the public
server, `info` and bearer schemes, drops unused components and checks the
paths against an allowlist. This site copies the result into
`spec/management-api-v3.yaml` and builds the pilot from it as it is.

Content fixes go into the service spec, not the overlay.

Done upstream: the server, authentication (a management token everywhere;
either one on `POST /api-keys`, which can create only temporary keys with an
API key) and `date-time`.

### To fix

- **Content lost from `spec/mp.yaml`:** the docs team's edits never reached the
  service spec. Port them: the `POST /api-keys` description, the `type`
  parameter's description, the `CreateApiKeysRequest` property descriptions
  (marking `region` deprecated), and summaries that match the live pages —
  without trailing full stops or "contract".
- **`CreateProjectRequest.contract_id`:** contracts are internal; does it
  belong in the public spec?
- **Examples:** no operation has a request or response example.
- **Undescribed fields:** `apikey_id` and `project_id` (path), and most
  properties of `Project`, `ApiKey` and `CreateApiKeysResponse`.

`spec/mp.yaml` and `generate-mp-spec.ts` stay until the live reference moves to
the public spec.

## Batch API (`spec/batch.yaml`)

- **Examples:** upstream has error examples only. `batch.overlay.yaml` adds a
  success example per operation, which the code-sample tests serve and check
  against the schemas; upstream could take them as they are.
- **Stale examples:** the schema-level examples on `RetrieveJobsResponse`,
  `RetrieveJobResponse` and `DeleteJobResponse` use `status: transcribing`
  and a job-level `transcription_config`, neither of which the schema has; the
  `/usage` example has alignment jobs, which no longer exist (the overlay
  replaces it).
- **`SentimentSegment.confidence`:** `type: number,` — a typo no validator
  accepts (the overlay fixes it).
- **`/jobs/{jobid}/log`:** not for customers, so both references leave it out
  (`sidebar-generator.ts`, `batch.overlay.yaml`). Removing or marking it
  upstream would let both filters go.
- **What `batch.overlay.yaml` adds:** each action there is a candidate. Most
  need OpenAPI 3 (the multipart `config` part as a `JobConfig` sent as JSON,
  the bearer scheme, documented enum values), so they wait on upstream's move
  off Swagger 2.0.

**Verdict for Batch**: Add more examples using overlay, as well as for MP, but let's tackle examples for all APIs together on a subsequent pass.
