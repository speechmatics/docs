/**
 * Builds src/generated/<name>.openapi.yaml — an API as OpenAPI 3, for
 * Speculoos — from a Swagger 2.0 source and spec/<name>.overlay.yaml:
 *
 *   tsx scripts/generate-openapi.ts batch static/batch.yaml
 *
 *   1. Convert Swagger 2.0 to OpenAPI 3.0 with swagger2openapi. `anchors`
 *      lets YAML anchors in the source through.
 *   2. Apply the overlay: an OpenAPI Overlay 1.0 document, whose actions add
 *      what Swagger 2.0 cannot express.
 *
 * The overlay is applied here rather than by a library: the only Node one is
 * young and quiet, the format is a few lines of JSONPath, and applying it here
 * lets an action that matches nothing fail the build — a field renamed
 * upstream would otherwise silently drop its patch.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { JSONPath } from "jsonpath-plus";
import swagger2openapi from "swagger2openapi"; // ships no types
import yaml from "yaml";

const [NAME, SOURCE] = process.argv.slice(2);
if (NAME === undefined || SOURCE === undefined) {
  console.error(
    "usage: tsx scripts/generate-openapi.ts <name> <swagger-2.0-source>",
  );
  process.exit(1);
}
const OVERLAY = `spec/${NAME}.overlay.yaml`;
const OUT = `src/generated/${NAME}.openapi.yaml`;

type Json = Record<string, unknown>;

interface Action {
  target: string;
  description?: string;
  update?: unknown;
  remove?: boolean;
}

const isObject = (v: unknown): v is Json =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Overlay 1.0's update: objects merge recursively, an array target is
 * appended to, anything else is replaced.
 */
function merge(target: Json, update: Json): void {
  for (const [key, value] of Object.entries(update)) {
    const current = target[key];
    if (isObject(current) && isObject(value)) merge(current, value);
    else target[key] = structuredClone(value);
  }
}

function apply(document: Json, actions: Action[]): void {
  for (const action of actions) {
    const matches = JSONPath<
      {
        parent: Json | unknown[] | null;
        parentProperty: string | number;
        value: unknown;
      }[]
    >({
      path: action.target,
      json: document,
      resultType: "all",
    });
    if (matches.length === 0) {
      throw new Error(
        `${OVERLAY}: no match for ${action.target}${action.description ? ` (${action.description})` : ""}`,
      );
    }
    for (const { parent, parentProperty, value } of matches) {
      if (action.remove === true) {
        if (Array.isArray(parent)) parent.splice(Number(parentProperty), 1);
        else if (parent !== null) delete parent[parentProperty as string];
      } else if (action.update !== undefined) {
        if (Array.isArray(value)) value.push(structuredClone(action.update));
        else if (isObject(value) && isObject(action.update))
          merge(value, action.update);
        else
          throw new Error(
            `${OVERLAY}: cannot update ${action.target}, which is not an object or array`,
          );
      }
    }
  }
}

async function main(): Promise<void> {
  const swagger = yaml.parse(readFileSync(SOURCE, "utf8"));
  const { openapi } = await swagger2openapi.convertObj(swagger, {
    anchors: true,
    patch: true,
  });
  const overlay = yaml.parse(readFileSync(OVERLAY, "utf8")) as {
    actions: Action[];
  };
  apply(openapi, overlay.actions);
  writeFileSync(OUT, yaml.stringify(openapi));
  console.log(
    `${SOURCE} + ${OVERLAY} → ${OUT} (${overlay.actions.length} actions)`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
