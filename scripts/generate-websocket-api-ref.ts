import { writeFile } from "node:fs/promises";
import { Parser, fromFile } from "@asyncapi/parser";

(async () => {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  const parser = new Parser();
  const { document } = await fromFile(parser, inputPath).parse();

  let mdx = `
import SchemaNode from "@theme/Schema";
import Details from "@theme/Details";

# ${document.info().externalDocs().description()}

`;

  const allMessageNames = Array.from(
    document.allMessages(),
    (m) => m.json()["x-parser-message-name"],
  );

  for (const channel of document.allChannels()) {
    mdx += `## ${channel.id() === "publish" ? "Sent messages" : "Received messages"}
`;

    const messages = channel.messages();

    for (const message of messages) {
      const summary = message.summary();
      const { "x-parser-message-name": name, payload } = message.json();

      mdx += `
### ${name}

${wrapMessageNamesInLinks(
  summary,
  allMessageNames.filter((n) => n !== name),
)}

<SchemaNode schema={${JSON.stringify(payload)}} />
`;
    }
  }

  await writeFile(outputPath, mdx);
})();

function wrapMessageNamesInLinks(text: string, messageNames: string[]) {
  // Escape special regex characters in message names
  const escapedNames = messageNames.map((name) =>
    name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  // Create pattern that matches message names
  // Using word boundaries to ensure we match whole words only
  const pattern = new RegExp(`\\b(${escapedNames.join("|")})\\b`, "g");

  // Replace each match with a markdown link
  return text.replace(pattern, (match, p1) => {
    return `[${p1}](#${p1.toLowerCase()})`;
  });
}
