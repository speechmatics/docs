import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import yaml from "yaml";

const spec = yaml.parse(readFileSync("spec/jobs.yaml", "utf8"));

const METHODS = ["get", "post", "delete"] as const;

const LANGUAGES = {
  js: "Javascript",
  py: "Python",
  sh: "Shell",
} as const;

for (const [path, data] of Object.entries(spec.paths)) {
  if (!data || typeof data !== "object")
    throw new Error(`Unexpected path value under "${path}": ${data}`);

  for (const method of METHODS) {
    if (method in data) {
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

writeFileSync("static/jobs.yaml", yaml.stringify(spec));
