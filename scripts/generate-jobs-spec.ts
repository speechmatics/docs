import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import yaml from "yaml";

const spec = yaml.parse(readFileSync("spec/jobs.yaml", "utf8"));

const METHODS = ["get", "post", "delete"] as const;

const LANGUAGES = {
  js: "Javascript",
  py: "Python",
  sh: "Shell",
} as const;

const includePaths = [
  "/jobs",
  "/jobs/{jobid}",
  "/jobs/{jobid}/transcript",
  "/jobs/{jobid}/alignment",
  "/usage",
];

spec.tags = [
  { name: "jobs", "x-displayName": "Jobs", description: "Jobs API" },
];

spec.basePath = "https://asr.api.speechmatics.com/v2";

for (const [path, data] of Object.entries(spec.paths)) {
  if (!data || typeof data !== "object")
    throw new Error(`Unexpected path value under "${path}": ${data}`);

  for (const method of METHODS) {
    if (method in data) {
      if (includePaths.includes(path)) {
        data[method].tags = ["jobs"];
      }

      let sampleFiles: string[] = [];
      try {
        sampleFiles = readdirSync(`./code-samples/jobs-api${path}`).filter(
          // Regex match: e.g. "get.py", "post.js"
          (file) => file.match(new RegExp(`^${method}.[A-Za-z]+$`)),
        );
      } catch (e) {
        console.warn(`Found no code samples directory for ${path}`);
      }

      if (sampleFiles.length === 0) {
        continue;
      }

      data[method]["x-codeSamples"] = sampleFiles.map((file) => ({
        lang: LANGUAGES[file.split(".")[1] as keyof typeof LANGUAGES],
        source: readFileSync(`./code-samples/jobs-api${path}/${file}`, "utf8"),
      }));
    }
  }
}

// Give titles to each schema
for (const name of Object.keys(spec.definitions)) {
  // @ts-ignore, if this errors it will just break the build
  spec.definitions[name].title = name;
}

writeFileSync("static/jobs.yaml", yaml.stringify(spec));
