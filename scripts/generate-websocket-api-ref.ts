import { Parser, fromFile } from "@asyncapi/parser";
import { writeFile } from "node:fs/promises";

(async () => {
  const parser = new Parser();
  const { document } = await fromFile(parser, "./spec/realtime.yaml").parse();

  const startRecognition = document.channels()[0].messages()[0].json();

  const mdx = `
import SchemaNode from "@theme/Schema";
import Details from "@theme/Details";

### ${startRecognition["x-parser-message-name"]}

${startRecognition.summary}

<SchemaNode schema={${JSON.stringify(startRecognition.payload)}} />
`;

  await writeFile("./docs/api-ref/realtime.mdx", mdx);
})();
