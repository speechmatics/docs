/**
 * Builds static/mp-api.yaml — the Management API spec the live reference reads — from
 * spec/mp.yaml, with the code samples in spec/code-samples/mp-api and a title on each
 * schema.
 */
import { readFileSync, writeFileSync } from "node:fs";
import yaml from "yaml";
import { addCodeSamples } from "./code-samples/inject";

const spec = yaml.parse(readFileSync("spec/mp.yaml", "utf8"));

spec.basePath = "https://mp.speechmatics.com/v1";

addCodeSamples(spec, "spec/code-samples/mp-api");

// Give titles to each schema
for (const name of Object.keys(spec.definitions)) {
  spec.definitions[name].title = name;
}

writeFileSync("static/mp-api.yaml", yaml.stringify(spec));
