/**
 * Builds static/mp-api.yaml — the Management API spec the reference reads —
 * from the public spec, generated upstream (spec/mp.yaml), with the code
 * samples in spec/code-samples/mp-api and a title on each schema. The public
 * spec is OpenAPI 3 and names its own server.
 */
import { readFileSync, writeFileSync } from "node:fs";
import yaml from "yaml";
import { addCodeSamples } from "./code-samples/inject";

const spec = yaml.parse(readFileSync("spec/mp.yaml", "utf8"));

addCodeSamples(spec, "spec/code-samples/mp-api");

// Give titles to each schema
for (const name of Object.keys(spec.components.schemas)) {
  spec.components.schemas[name].title = name;
}

writeFileSync("static/mp-api.yaml", yaml.stringify(spec));
