/**
 * Runs every code sample in spec/code-samples against a mock of its API built
 * from the API's OpenAPI spec (scripts/code-samples/mock.ts), and fails if any
 * sample does not run cleanly or sends a request the spec does not allow.
 *
 *   npm run test:code-samples
 *
 * Samples sit at `<api>/<path>/<method>.<ext>`, so each says which operation
 * it calls; every operation needs at least one. Samples keep their real URLs
 * and placeholders: the runner points each at the mock — Python through the
 * SDK's URL variable, JavaScript through a preloaded fetch hook, curl by
 * rewriting the host — and runs it in a scratch directory with an
 * `example.wav` to upload.
 *
 * Needs `uv` for the Python samples (the SDK is pinned in
 * spec/code-samples/requirements.txt) and `curl`.
 */
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative, resolve } from "node:path";
import { createMock } from "./code-samples/mock";

const REQUIREMENTS = "spec/code-samples/requirements.txt";
// Inside the repo, so JavaScript samples resolve the SDK from its node_modules.
const WORK = "node_modules/.cache/code-samples";
const FETCH_HOOK = "scripts/code-samples/fetch-hook.mjs";

interface Api {
  spec: string;
  samples: string;
  /** See `MockOptions.requireExamples`. */
  requireExamples: boolean;
  /** What points the Python SDK at the mock, given the mock's base URL. */
  pythonEnv?: (url: string) => Record<string, string>;
}

const APIS: Api[] = [
  {
    spec: "src/generated/batch.openapi.yaml",
    samples: "spec/code-samples/batch-api",
    requireExamples: true,
    pythonEnv: (url) => ({ SPEECHMATICS_BATCH_URL: url }),
  },
  {
    spec: "src/generated/mp.openapi.yaml",
    samples: "spec/code-samples/mp-api",
    // Its examples belong in the upstream spec, which has none yet
    // (spec/UPSTREAM-CHANGES.md). Require them once it does.
    requireExamples: false,
  },
];

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
  if (!existsSync(dir)) return [];
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

/** Runs one API's samples; returns the labels of those that failed. */
async function test(api: Api): Promise<{ ran: number; failures: string[] }> {
  const mock = createMock(api.spec, { requireExamples: api.requireExamples });
  const origin = await mock.listen();
  const samples = files(api.samples)
    .filter((f) => /\.(py|js|sh)$/.test(f))
    .sort();
  const failures: string[] = [];

  const expected = (file: string) => {
    const rel = relative(api.samples, file);
    const method = rel.split("/").at(-1)?.split(".")[0]?.toUpperCase();
    const dir = rel.split("/").slice(0, -1).join("/");
    return `${method} /${dir}`;
  };
  for (const op of mock.operations) {
    if (!samples.some((s) => expected(s) === op.key))
      failures.push(`${op.key}: no code sample`);
  }

  for (const sample of samples) {
    const operation = expected(sample);
    const ext = sample.split(".").at(-1);
    const source = readFileSync(sample, "utf8");
    const name = `sample.${ext === "js" ? "mjs" : ext}`;
    mock.reset();
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
        api.pythonEnv?.(`${origin}${mock.basePath}`) ?? {},
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
    if (mock.received.length === 0) problems.push("sent no request");
    for (const r of mock.received) {
      if (r.operation !== operation)
        problems.push(`sent ${r.method} ${r.url}, expected ${operation}`);
      for (const e of r.errors) problems.push(e);
    }
    const label = relative("spec/code-samples", sample);
    if (problems.length === 0) console.log(`ok    ${label}`);
    else {
      console.log(
        `FAIL  ${label}\n${problems.map((p) => `      ${p}`).join("\n")}\n${result.output.trim().replace(/^/gm, "      | ")}`,
      );
      failures.push(label);
    }
  }

  mock.close();
  return { ran: samples.length, failures };
}

async function main(): Promise<void> {
  mkdirSync(WORK, { recursive: true });
  writeFileSync(join(WORK, "example.wav"), wav());
  let ran = 0;
  const failures: string[] = [];
  for (const api of APIS) {
    const result = await test(api);
    ran += result.ran;
    failures.push(...result.failures);
  }
  if (failures.length > 0) {
    console.error(
      `\n${failures.length} failed:\n${failures.map((f) => `  ${f}`).join("\n")}`,
    );
    process.exit(1);
  }
  console.log(`\nAll ${ran} code samples passed.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
