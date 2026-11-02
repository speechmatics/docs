/**
 * Builds static/batch.yaml — the Batch API spec the live reference reads — from
 * spec/batch.yaml, with the code samples in spec/code-samples/batch-api and a title on each
 * schema.
 */
import { readFileSync, writeFileSync } from "node:fs";
import yaml from "yaml";
import { addCodeSamples } from "./code-samples/inject";

const spec = yaml.parse(readFileSync("spec/batch.yaml", "utf8"));

spec.basePath = "https://eu1.asr.api.speechmatics.com/v2";

addCodeSamples(spec, "spec/code-samples/batch-api");

// Give titles to each schema
for (const name of Object.keys(spec.definitions)) {
  spec.definitions[name].title = name;
}

writeFileSync("static/batch.yaml", yaml.stringify(spec));
