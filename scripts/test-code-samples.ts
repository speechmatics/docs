/**
 * Runs every code sample in spec/code-samples/batch-api against a mock of the
 * Batch API built from its OpenAPI spec, and fails if any sample does not run
 * cleanly or sends a request the spec does not allow.
 *
 *   npm run test:code-samples
 *
 * The mock answers each operation with the spec's own example for its success
 * response, so a sample's SDK parses the same payload the reference shows,
 * and an operation with samples but no example fails. It checks what a
 * sample sends: the method and path, an `Authorization: Bearer` header, the
 * query parameters the operation declares, and a JSON or multipart body
 * against its schema. It checks the examples it serves against their schemas
 * too.
 *
 * Samples keep their real URLs and `YOUR_API_KEY`: the runner points each one
 * at the mock — Python through `SPEECHMATICS_BATCH_URL`, JavaScript through a
 * preloaded fetch hook, curl by rewriting the host — and runs it in a scratch
 * directory with an `example.wav` to upload.
 *
 * Needs `uv` for the Python samples (the SDK is pinned in
 * spec/code-samples/requirements.txt) and `curl`.
 */
import { spawn } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { type IncomingMessage, createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { join, relative, resolve } from "node:path";
import addFormats from "ajv-formats";
import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";
import yaml from "yaml";

const SPEC = "src/generated/batch.openapi.yaml";
const SAMPLES = "spec/code-samples/batch-api";
const REQUIREMENTS = "spec/code-samples/requirements.txt";
// Inside the repo, so JavaScript samples resolve the SDK from its node_modules.
const WORK = "node_modules/.cache/code-samples";
const FETCH_HOOK = "scripts/code-samples/fetch-hook.mjs";

/** Query parameters SDKs add for Speechmatics' own tracking, not in the spec. */
const SDK_PARAMS = new Set(["sm-sdk", "sm-app"]);

type Json = Record<string, unknown>;

interface Operation {
  key: string; // "GET /jobs/{jobid}"
  method: string;
  template: string;
  pattern: RegExp;
  parameters: Json[];
  requestBody?: Json;
  responses: Record<string, Json>;
}

interface Received {
  method: string;
  url: string;
  operation?: string;
  status: number;
  errors: string[];
}

const doc = yaml.parse(readFileSync(SPEC, "utf8")) as Json;
const basePath = new URL(
  (doc.servers as { url: string }[])[0]?.url ?? "/",
  "http://mock",
).pathname.replace(/\/$/, "");

// The whole document is one schema, so `#/components/...` references resolve.
const ajv = new Ajv2020({ strict: false, allErrors: true, logger: false });
const coercing = new Ajv2020({
  strict: false,
  allErrors: true,
  logger: false,
  coerceTypes: true,
});
for (const instance of [ajv, coercing]) {
  addFormats(instance);
  for (const format of ["binary", "bytes", "int32", "int64", "float", "double"])
    instance.addFormat(format, true);
  instance.addSchema({ ...doc, $id: "spec" });
}

/** A schema from the document, with its references made absolute to it. */
function absolute(schema: unknown): unknown {
  if (Array.isArray(schema)) return schema.map(absolute);
  if (typeof schema !== "object" || schema === null) return schema;
  return Object.fromEntries(
    Object.entries(schema).map(([k, v]) => [
      k,
      k === "$ref" && typeof v === "string" && v.startsWith("#")
        ? `spec${v}`
        : absolute(v),
    ]),
  );
}

const compiled = new Map<string, ValidateFunction>();
function validator(schema: unknown, coerce = false): ValidateFunction {
  const key = `${coerce}${JSON.stringify(schema)}`;
  let fn = compiled.get(key);
  if (fn === undefined) {
    fn = (coerce ? coercing : ajv).compile(absolute(schema) as object);
    compiled.set(key, fn);
  }
  return fn;
}

function check(
  schema: unknown,
  value: unknown,
  what: string,
  errors: string[],
  coerce = false,
): void {
  // Coercion needs a parent to write the coerced value back into.
  const fn = validator(
    coerce ? { type: "object", properties: { value: schema } } : schema,
    coerce,
  );
  if (!fn(coerce ? { value } : value)) {
    errors.push(`${what}: ${ajv.errorsText(fn.errors, { dataVar: what })}`);
  }
}

const METHODS = ["get", "put", "post", "delete", "patch"];
const operations: Operation[] = Object.entries(
  doc.paths as Record<string, Json>,
).flatMap(([template, item]) =>
  METHODS.filter((m) => item[m] !== undefined).map((method) => {
    const op = item[method] as Json;
    const source = template
      .replace(/[.*+?^$()|[\]\\]/g, "\\$&")
      .replace(/\{[^}]+\}/g, "([^/]+)");
    return {
      key: `${method.toUpperCase()} ${template}`,
      method: method.toUpperCase(),
      template,
      pattern: new RegExp(`^${basePath}${source}/?$`),
      parameters: [
        ...((item.parameters as Json[]) ?? []),
        ...((op.parameters as Json[]) ?? []),
      ],
      requestBody: op.requestBody as Json | undefined,
      responses: op.responses as Record<string, Json>,
    };
  }),
);

function exampleOf(content: Json): { found: boolean; value?: unknown } {
  if ("example" in content) return { found: true, value: content.example };
  const first = Object.values(
    (content.examples as Record<string, Json>) ?? {},
  )[0];
  return first === undefined
    ? { found: false }
    : { found: true, value: first.value };
}

async function body(request: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

async function checkBody(
  op: Operation,
  request: IncomingMessage,
  raw: Buffer,
  errors: string[],
): Promise<void> {
  const content = (op.requestBody?.content as Record<string, Json>) ?? {};
  const type =
    (request.headers["content-type"] ?? "").split(";")[0]?.trim() ?? "";
  if (Object.keys(content).length === 0) return;
  const media = content[type];
  if (media === undefined) {
    errors.push(
      `request body: ${type || "none"}, expected one of ${Object.keys(content).join(", ")}`,
    );
    return;
  }
  const schema = media.schema as Json;
  if (type === "application/json") {
    check(schema, JSON.parse(raw.toString("utf8")), "body", errors);
  } else if (type === "multipart/form-data") {
    const form = await new Request("http://mock", {
      method: "POST",
      headers: { "content-type": request.headers["content-type"] ?? "" },
      body: new Uint8Array(raw),
    }).formData();
    // TypeScript's FormData here is not iterable.
    const parts = form as unknown as Iterable<[string, unknown]>;
    const properties = (schema.properties as Record<string, Json>) ?? {};
    for (const [name] of parts) {
      if (!(name in properties))
        errors.push(`multipart part "${name}" is not in the spec`);
    }
    for (const name of (schema.required as string[]) ?? []) {
      if (!form.has(name)) errors.push(`multipart part "${name}" is required`);
    }
    // A part sent as JSON (the spec's `encoding`) is checked against its schema.
    const encoding =
      (media.encoding as Record<string, { contentType?: string }>) ?? {};
    for (const [name, part] of Object.entries(encoding)) {
      const value = form.get(name);
      if (
        part.contentType === "application/json" &&
        typeof value === "string"
      ) {
        check(properties[name], JSON.parse(value), name, errors);
      }
    }
  }
}

/** The success response a request gets, chosen as a client would ask for it. */
function respond(
  op: Operation,
  url: URL,
  accept: string,
  errors: string[],
): { status: number; type?: string; payload?: string } {
  const success = Object.entries(op.responses)
    .filter(([status]) => status.startsWith("2"))
    .sort(([a], [b]) => a.localeCompare(b))[0];
  if (success === undefined) {
    errors.push(`${op.key} has no success response`);
    return { status: 500 };
  }
  const [status, response] = success;
  const content = (response.content as Record<string, Json>) ?? {};
  if (Object.keys(content).length === 0) return { status: Number(status) };
  const withExample = Object.keys(content).filter(
    (type) => exampleOf(content[type] as Json).found,
  );
  const format = url.searchParams.get("format");
  const wanted =
    format === "txt" || format === "srt"
      ? ["text/plain"]
      : accept.split(",").map((t) => t.split(";")[0]?.trim());
  const type =
    wanted.find((t) => t !== undefined && withExample.includes(t)) ??
    (withExample.includes("application/json")
      ? "application/json"
      : withExample[0]);
  if (type === undefined) {
    errors.push(`${op.key} ${status} has no example to answer with`);
    return { status: 500 };
  }
  const media = content[type] as Json;
  const { value } = exampleOf(media);
  check(media.schema, value, `${op.key} ${status} example`, errors);
  return {
    status: Number(status),
    type,
    payload: typeof value === "string" ? value : JSON.stringify(value),
  };
}

const received: Received[] = [];

const server = createServer(async (request, reply) => {
  const url = new URL(request.url ?? "/", "http://mock");
  const errors: string[] = [];
  const op = operations.find(
    (o) => o.method === request.method && o.pattern.test(url.pathname),
  );
  const record: Received = {
    method: request.method ?? "",
    url: url.pathname + url.search,
    status: 404,
    errors,
  };
  received.push(record);
  if (op === undefined) {
    errors.push(`no operation for ${request.method} ${url.pathname}`);
    reply.writeHead(404).end();
    return;
  }
  record.operation = op.key;

  if (!/^Bearer \S+/.test(request.headers.authorization ?? ""))
    errors.push("no Authorization: Bearer header");

  const values = op.pattern.exec(url.pathname)?.slice(1) ?? [];
  const names = [...op.template.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
  for (const parameter of op.parameters) {
    const name = parameter.name as string;
    if (parameter.in === "path") {
      check(
        parameter.schema,
        decodeURIComponent(values[names.indexOf(name)] ?? ""),
        `path ${name}`,
        errors,
        true,
      );
    } else if (parameter.in === "query") {
      const value = url.searchParams.get(name);
      if (value === null) {
        if (parameter.required) errors.push(`query ${name} is required`);
      } else check(parameter.schema, value, `query ${name}`, errors, true);
    }
  }
  const declared = new Set(
    op.parameters.filter((p) => p.in === "query").map((p) => p.name),
  );
  for (const name of url.searchParams.keys()) {
    if (!declared.has(name) && !SDK_PARAMS.has(name))
      errors.push(`query ${name} is not in the spec`);
  }

  try {
    await checkBody(op, request, await body(request), errors);
  } catch (error) {
    errors.push(
      `request body: ${error instanceof Error ? error.message : error}`,
    );
  }

  const { status, type, payload } = respond(
    op,
    url,
    request.headers.accept ?? "",
    errors,
  );
  record.status = errors.length > 0 ? 400 : status;
  if (errors.length > 0)
    reply
      .writeHead(400, { "content-type": "application/json" })
      .end(JSON.stringify({ code: 400, error: errors.join("; ") }));
  else
    reply.writeHead(status, type ? { "content-type": type } : {}).end(payload);
});

function run(
  command: string,
  args: string[],
  env: Record<string, string>,
): Promise<{ code: number; output: string }> {
  return new Promise((done) => {
    const child = spawn(command, args, {
      cwd: WORK,
      env: { ...process.env, ...env },
    });
    let output = "";
    child.stdout.on("data", (d) => {
      output += d;
    });
    child.stderr.on("data", (d) => {
      output += d;
    });
    const timer = setTimeout(() => child.kill(), 120_000);
    child.on("close", (code) => {
      clearTimeout(timer);
      done({ code: code ?? 1, output });
    });
  });
}

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

/** A silent second of 16 kHz mono 16-bit PCM: something to upload. */
function wav(): Buffer {
  const samples = 16_000;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + samples * 2, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(16_000, 24);
  header.writeUInt32LE(32_000, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(samples * 2, 40);
  return Buffer.concat([header, Buffer.alloc(samples * 2)]);
}

async function main(): Promise<void> {
  mkdirSync(WORK, { recursive: true });
  writeFileSync(join(WORK, "example.wav"), wav());
  await new Promise<void>((listening) =>
    server.listen(0, "127.0.0.1", listening),
  );
  const origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

  const samples = files(SAMPLES)
    .filter((f) => /\.(py|js|sh)$/.test(f))
    .sort();
  const failures: string[] = [];

  // Every operation has a sample, and every sample an operation.
  const expected = (file: string) => {
    const rel = relative(SAMPLES, file);
    const method = rel.split("/").at(-1)?.split(".")[0]?.toUpperCase();
    const dir = rel.split("/").slice(0, -1).join("/");
    return `${method} /${dir}`;
  };
  for (const op of operations) {
    if (!samples.some((s) => expected(s) === op.key))
      failures.push(`${op.key}: no code sample`);
  }

  for (const sample of samples) {
    const operation = expected(sample);
    const ext = sample.split(".").at(-1);
    const source = readFileSync(sample, "utf8");
    const name = `sample.${ext === "js" ? "mjs" : ext}`;
    received.length = 0;
    let result: { code: number; output: string };
    if (ext === "py") {
      writeFileSync(join(WORK, name), source);
      result = await run(
        "uv",
        [
          "run",
          "--quiet",
          "--no-project",
          "--with-requirements",
          resolve(REQUIREMENTS),
          "python",
          "-I",
          name,
        ],
        { SPEECHMATICS_BATCH_URL: `${origin}${basePath}` },
      );
    } else if (ext === "js") {
      writeFileSync(join(WORK, name), source);
      result = await run("node", ["--import", resolve(FETCH_HOOK), name], {
        CODE_SAMPLES_MOCK_ORIGIN: origin,
      });
    } else {
      writeFileSync(
        join(WORK, name),
        source.replace(/https:\/\/([a-z0-9-]+\.)*speechmatics\.com/g, origin),
      );
      result = await run("bash", ["-e", name], {});
    }

    const problems: string[] = [];
    if (result.code !== 0) problems.push(`exited ${result.code}`);
    if (received.length === 0) problems.push("sent no request");
    for (const r of received) {
      if (r.operation !== operation)
        problems.push(`sent ${r.method} ${r.url}, expected ${operation}`);
      for (const e of r.errors) problems.push(e);
    }
    const label = relative(SAMPLES, sample);
    if (problems.length === 0) console.log(`ok    ${label}`);
    else {
      console.log(
        `FAIL  ${label}\n${problems.map((p) => `      ${p}`).join("\n")}\n${result.output.trim().replace(/^/gm, "      | ")}`,
      );
      failures.push(label);
    }
  }

  server.close();
  if (failures.length > 0) {
    console.error(
      `\n${failures.length} failed:\n${failures.map((f) => `  ${f}`).join("\n")}`,
    );
    process.exit(1);
  }
  console.log(`\nAll ${samples.length} code samples passed.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
