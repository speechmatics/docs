/**
 * Builds static/mp-api.yaml — the Management API spec the reference reads —
 * from the public spec, generated upstream (spec/mp.yaml), with a title on
 * each schema. The public spec is OpenAPI 3 and names its own server.
 */
import { readFileSync, writeFileSync } from "node:fs";
import yaml from "yaml";

const spec = yaml.parse(readFileSync("spec/mp.yaml", "utf8"));

// Give titles to each schema
for (const name of Object.keys(spec.components.schemas)) {
  spec.components.schemas[name].title = name;
}

writeFileSync("static/mp-api.yaml", yaml.stringify(spec));
