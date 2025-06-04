import { writeFile } from "node:fs/promises";
import { Parser, fromFile } from "@asyncapi/parser";

(async () => {
  const parser = new Parser();
  const { document } = await fromFile(parser, "./spec/realtime.yaml").parse();

  let mdx = `
import SchemaNode from "@theme/Schema";
import Details from "@theme/Details";

# ${document.info().externalDocs().description()}

`;

  for (const channel of document.allChannels()) {
    mdx += `## ${channel.id() === "publish" ? "Sent messages" : "Received messages"}
`;

    for (const message of channel.messages()) {
      const {
        "x-parser-message-name": name,
        summary,
        payload,
      } = message.json();
      mdx += `
### ${name}

${summary}

<SchemaNode schema={${JSON.stringify(payload)}} />
`;
    }
  }

  await writeFile("./docs/api-ref/realtime.mdx", mdx);
})();
