/**
 * A mock of an API, built from its OpenAPI document, for running code samples
 * against (see scripts/test-code-samples.ts).
 *
 * It answers each operation with the spec's own example for its success
 * response, so a sample's SDK parses the same payload the reference shows. It
 * checks what a request sends: the method and path, an `Authorization:
 * Bearer` header, the query parameters the operation declares, and a JSON or
 * multipart body against its schema. It checks the examples it serves against
 * their schemas too. Each request is recorded, with what was wrong with it.
 */
import { readFileSync } from "node:fs";
import { type IncomingMessage, type Server, createServer } from "node:http";
import type { AddressInfo } from "node:net";
import addFormats from "ajv-formats";
import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";
import yaml from "yaml";

/** Query parameters SDKs add for Speechmatics' own tracking, not in the spec. */
const SDK_PARAMS = new Set(["sm-sdk", "sm-app"]);

const METHODS = ["get", "put", "post", "delete", "patch"];

type Json = Record<string, unknown>;

export interface Operation {
  key: string; // "GET /jobs/{jobid}"
  method: string;
  template: string;
  pattern: RegExp;
  parameters: Json[];
  requestBody?: Json;
  responses: Record<string, Json>;
}

export interface Received {
  method: string;
  url: string;
  operation?: string;
  status: number;
  errors: string[];
}

export interface Mock {
  /** The spec's server path, `/v2`: what the mock serves under. */
  basePath: string;
  operations: Operation[];
  /** Requests since the last `reset`. */
  received: Received[];
  reset(): void;
  /** Starts listening; resolves to the mock's origin. */
  listen(): Promise<string>;
  close(): void;
}

export interface MockOptions {
  /**
   * Whether an operation's success response must have an example to answer
   * with. Off, the mock answers with no body instead — for an API whose
   * examples have not been written yet.
   */
  requireExamples: boolean;
}

function exampleOf(content: Json): { found: boolean; value?: unknown } {
  if ("example" in content) return { found: true, value: content.example };
  const first = Object.values(
    (content.examples as Record<string, Json>) ?? {},
  )[0];
  return first === undefined
    ? { found: false }
    : { found: true, value: first.value };
}

async function bodyOf(request: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

export function createMock(specPath: string, options: MockOptions): Mock {
  const doc = yaml.parse(readFileSync(specPath, "utf8")) as Json;
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
    for (const format of [
      "binary",
      "bytes",
      "int32",
      "int64",
      "float",
      "double",
    ])
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
  function validator(schema: unknown, coerce: boolean): ValidateFunction {
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
    if (raw.length === 0 && op.requestBody?.required !== true) return;
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
        if (!form.has(name))
          errors.push(`multipart part "${name}" is required`);
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
      if (options.requireExamples)
        errors.push(`${op.key} ${status} has no example to answer with`);
      return { status: Number(status) };
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

  const server: Server = createServer(async (request, reply) => {
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
      await checkBody(op, request, await bodyOf(request), errors);
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
      reply
        .writeHead(status, type ? { "content-type": type } : {})
        .end(payload);
  });

  return {
    basePath,
    operations,
    received,
    reset: () => {
      received.length = 0;
    },
    listen: () =>
      new Promise((listening) =>
        server.listen(0, "127.0.0.1", () =>
          listening(
            `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
          ),
        ),
      ),
    close: () => {
      server.close();
    },
  };
}
