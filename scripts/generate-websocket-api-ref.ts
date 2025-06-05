import { writeFile } from "node:fs/promises";
import { Parser, fromFile } from "@asyncapi/parser";

(async () => {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];

  const parser = new Parser();
  const { document } = await fromFile(parser, inputPath).parse();

  let mdx = `---
title: ${document.info().externalDocs().description()}
hide_title: true
---
import SchemaNode from "@theme/Schema";
import Details from "@theme/Details";
import Heading from "@theme/Heading";

<Heading
  as={"h1"}
  className={"openapi__heading"}
  children={"${document.info().externalDocs().description()}"}
>
</Heading>

<pre className="openapi__method-endpoint">
  <span className="badge badge--primary">GET</span>
  <h2 className="openapi__method-endpoint-path">${document.servers()[0].url()}</h2>
</pre>

<div className="openapi__divider"></div>
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
