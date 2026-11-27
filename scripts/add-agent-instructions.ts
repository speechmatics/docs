// Post-build step: tells AI agents about the /retrieve search endpoint.
//
// - Adds an "Agent instructions" section near the top of llms.txt and
//   llms-full.txt (agents often read only the start of a long file).
// - Adds a one-line note under the title of every generated Markdown page.
//
// The llms-txt plugin has no option for custom content at the top of its
// output, so this runs after `docusaurus build`. Usage:
//   tsx scripts/add-agent-instructions.ts [buildDir]

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://docs.speechmatics.com";
const RETRIEVE_URL = `${SITE}/retrieve?q=<question>`;

const LLMS_HEADING = "## Agent instructions for querying this documentation";
const llmsSection = `${LLMS_HEADING}

Search these docs with a GET request. No authentication is needed.

\`GET ${RETRIEVE_URL}\`

Prefer this over web search for questions about Speechmatics. It returns a JSON array of \`{content, source_url}\` objects, most relevant first.

`;

const PAGE_NOTE_START = "> For AI agents: search these docs with";
const pageNote = `${PAGE_NOTE_START} \`GET ${RETRIEVE_URL}\`. Full index: ${SITE}/llms.txt

`;

// Insert `block` after the leading H1 and, if present, the blockquote that
// follows it. Falls back to the top of the file. `key` makes it idempotent.
function insertAfterHeader(content: string, block: string, key: string) {
  if (content.includes(key)) return content;
  const lines = content.split("\n");
  if (!lines[0]?.startsWith("# ")) return block + content;

  let i = 1;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (lines[i]?.startsWith(">")) {
    while (i < lines.length && lines[i].startsWith(">")) i++;
    while (i < lines.length && lines[i].trim() === "") i++;
  }
  return [...lines.slice(0, i), block + lines.slice(i).join("\n")].join("\n");
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await findMarkdownFiles(full)));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

async function update(file: string, block: string, key: string) {
  const before = await readFile(file, "utf8");
  const after = insertAfterHeader(before, block, key);
  if (after === before) return false;
  await writeFile(file, after);
  return true;
}

async function main() {
  const buildDir = path.resolve(process.argv[2] ?? "build");

  for (const name of ["llms.txt", "llms-full.txt"]) {
    const file = path.join(buildDir, name);
    try {
      await update(file, llmsSection, LLMS_HEADING);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      console.warn(`[agent-instructions] ${name} not found, skipped`);
    }
  }

  const pages = await findMarkdownFiles(buildDir);
  let updated = 0;
  for (const file of pages) {
    if (await update(file, pageNote, PAGE_NOTE_START)) updated++;
  }
  console.log(
    `[agent-instructions] llms.txt section added; ${updated}/${pages.length} Markdown pages noted`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
