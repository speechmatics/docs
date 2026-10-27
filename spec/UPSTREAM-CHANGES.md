# Spec changes to make upstream

The Batch and Management API specs originate in another repo; this site copies
them into `spec/` and patches what it must with overlays
(`spec/<name>.overlay.yaml`). This file collates what should change at the
source, so the overlays can shrink and the copies here stop drifting.

When a change lands upstream, delete its entry here and the overlay action it
replaces.

## Management API (`spec/mp.yaml`)

### To check

- **Path:** the spec says `/api-keys`, but the curl examples in
  `docs/get-started/authentication.mdx` call `/v1/api_keys`. One is wrong.
- **Authentication for creating a key:** the spec says `POST /api-keys` takes a
  management token, but the temporary-key examples in
  `docs/get-started/authentication.mdx` send `$API_KEY`. Either both work, and
  the spec should say which creates what, or the examples are out of date.

### To fix

- **Server:** declare the host (`https://mp.speechmatics.com/v1`). The spec
  gives only `basePath: /v1`; `generate-mp-spec.ts` and `mp.overlay.yaml` each
  add the host their own way.
- **Authentication:** declare the bearer scheme and apply it to every
  operation. The spec declares none; `mp.overlay.yaml` adds it.
- **Date format:** `format: datetime` (on `Project.created_at`,
  `Project.deleted_at` and `ApiKey.created_at`) should be `date-time`.
- **Examples:** no operation has a request or response example.
- **Titles:** "Post a new project" reads oddly beside "Create an API key";
  "Create a project" would match.
- **Undescribed fields:** `apikey_id` (path), and most properties of
  `Project`, `ApiKey` and `CreateApiKeysResponse`, have no description.

## Batch API (`spec/batch.yaml`)

- **Examples:** most operations have only error examples, so the example panel
  beside them shows errors alone. Success examples are needed.
- **`/jobs/{jobid}/log`:** not for customers, so both references leave it out
  (`sidebar-generator.ts`, `batch.overlay.yaml`). Removing or marking it
  upstream would let both filters go.
- **What `batch.overlay.yaml` adds:** each action there is a candidate. Most
  need OpenAPI 3 (the multipart `config` part as a `JobConfig` sent as JSON,
  the bearer scheme, documented enum values), so they wait on upstream's move
  off Swagger 2.0.
