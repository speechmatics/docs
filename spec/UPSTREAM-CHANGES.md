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
  **Verdict**: `/api-keys` is correct. `/api_keys` still technically works but is legacy and should be updated.
  **Next:** update the curl examples in `authentication.mdx` (a docs change, not
  upstream).
- **Authentication for creating a key:** the spec says `POST /api-keys` takes a
  management token, but the temporary-key examples in
  `docs/get-started/authentication.mdx` send `$API_KEY`. Either both work, and
  the spec should say which creates what, or the examples are out of date.
  **Verdict**: Historically we didn't have management tokens, only long lived keys. Currently callers may generate short lived keys with either management tokens or long-lived keys, but can only generate long-lived keys with management tokens. I don't know what's best to surface here.
  **Next:** the public overlay (below) declares two bearer schemes,
  `managementToken` everywhere and either one on `POST /api-keys`, and says
  in that operation's description that an API key can only create temporary
  keys.

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

**Verdict for MP**: ~~Update the WIP V3 spec in spec/management-platform-v3.yaml.~~
Superseded by the plan below.

### Plan: the public spec is generated upstream

The upstream spec is the Management Platform service's own OpenAPI 3 spec,
which covers more than the public API and describes requests as they arrive
from the auth proxy. The public spec is made from it **in the upstream repo**,
by Go tooling there, and this site hosts only the result:

- An OpenAPI Overlay 1.0 (RFC 9535 JSONPath targets) describes what the proxy
  changes: it removes the non-public paths and the proxy's `X-Verified-*`
  headers, and adds the public server, the bearer schemes and the public
  `info`.
- After the overlay, the tooling drops unused components and checks the paths
  against an allowlist of public ones (`/api-keys`, `/api-keys/{apikey_id}`,
  `/projects`, `/projects/{project_id}`), so a new internal endpoint cannot
  reach the docs.
- CI publishes the public spec; this site fetches it.

The content fixes under "To fix" go into the service spec itself, not the
overlay: the overlay is only for what the proxy changes. "Server" and
"Authentication" are the overlay's.

Until the public spec is published, the pilot keeps building from
`spec/mp.yaml` with `mp.overlay.yaml`. Then both go, and so does
`generate-mp-spec.ts` once the live reference moves over.

The service spec is not committed to this repo: this repo is public.

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

**Verdict for Batch**: Add more examples using overlay, as well as for MP, but let's tackle examples for all APIs together on a subsequent pass.
