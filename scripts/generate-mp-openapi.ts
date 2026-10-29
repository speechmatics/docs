/**
 * Builds src/generated/mp.openapi.yaml — what Speculoos reads for the
 * Management API — from the public spec, generated upstream
 * (spec/management-api-v3.yaml), and the code samples in
 * spec/code-samples/mp-api.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import yaml from "yaml";
import { addCodeSamples } from "./code-samples/inject";

const SOURCE = "spec/management-api-v3.yaml";
const SAMPLES = "spec/code-samples/mp-api";
const OUT = "src/generated/mp.openapi.yaml";

const spec = yaml.parse(readFileSync(SOURCE, "utf8"));
const added = addCodeSamples(spec, SAMPLES);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, yaml.stringify(spec));
console.log(`${SOURCE} + ${added} code samples → ${OUT}`);
