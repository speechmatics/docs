/**
 * Adds a spec's code samples to it as `x-codeSamples` (Redoc's extension,
 * which the reference renders as tabs): each file at
 * `<dir>/<path>/<method>.<ext>` goes on that operation, in that language.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const LANGUAGES: Record<string, string> = {
  js: "Javascript",
  py: "Python",
  sh: "Shell",
};

const METHODS = ["get", "put", "post", "delete", "patch"];

type Json = Record<string, unknown>;

/** Adds samples to `spec` in place; returns how many. */
export function addCodeSamples(spec: Json, dir: string): number {
  let added = 0;
  for (const [path, item] of Object.entries(
    spec.paths as Record<string, Json>,
  )) {
    const folder = join(dir, path);
    if (!existsSync(folder)) continue;
    const files = readdirSync(folder).sort();
    for (const method of METHODS) {
      const operation = item[method] as Json | undefined;
      if (operation === undefined) continue;
      const samples = files.flatMap((file) => {
        const [name, ext = ""] = file.split(".");
        const lang = LANGUAGES[ext];
        return name === method && lang !== undefined
          ? [{ lang, source: readFileSync(join(folder, file), "utf8") }]
          : [];
      });
      if (samples.length === 0) continue;
      operation["x-codeSamples"] = samples;
      added += samples.length;
    }
  }
  return added;
}
