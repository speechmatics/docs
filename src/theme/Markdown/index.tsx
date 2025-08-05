import React from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MDXComponents from "../MDXComponents";

function remarkAdmonition() {
  return (tree) => {
    const openingTagRegex = /^:::(\w+)(?:\[(.*?)\])?\s*$/;
    const closingTagRegex = /^:::\s*$/;
    const textOnlyAdmonition = /^:::(\w+)(?:\[(.*?)\])?\s*([\s\S]*?)\s*:::$/;

    const nodes = [];
    let bufferedChildren = [];

    let insideAdmonition = false;
    let type = null;
    let title = null;

    // TODO replace this code with a proper remark plugin
    // biome-ignore lint/complexity/noForEach: For some reason, using forEach is necessary here...
    tree.children.forEach((node) => {
      if (
        node.type === "paragraph" &&
        node.children.length === 1 &&
        node.children[0].type === "text"
      ) {
        const text = node.children[0].value.trim();
        const openingMatch = text.match(openingTagRegex);
        const closingMatch = text.match(closingTagRegex);
        const textOnlyAdmonitionMatch = text.match(textOnlyAdmonition);

        if (textOnlyAdmonitionMatch) {
          const type = textOnlyAdmonitionMatch[1];
          const title = textOnlyAdmonitionMatch[2]
            ? textOnlyAdmonitionMatch[2]?.trim()
            : undefined;
          const content = textOnlyAdmonitionMatch[3];

          const admonitionNode = {
            type: "admonition",
            data: {
              hName: "Admonition", // Tells ReactMarkdown to replace the node with Admonition component
              hProperties: {
                type, // Passed as a prop to the Admonition component
                title,
              },
            },
            children: [
              {
                type: "text",
                value: content?.trim(), // Trim leading/trailing whitespace
              },
            ],
          };
          nodes.push(admonitionNode);
          return;
        }

        if (openingMatch) {
          type = openingMatch[1];
          title = openingMatch[2] || type;
          insideAdmonition = true;
          return;
        }

        if (closingMatch && insideAdmonition) {
          nodes.push({
            type: "admonition",
            data: {
              hName: "Admonition",
              hProperties: { type: type, title: title },
            },
            children: bufferedChildren,
          });
          bufferedChildren = [];
          insideAdmonition = false;
          type = null;
          title = null;
          return;
        }
      }

      if (insideAdmonition) {
        bufferedChildren.push(node);
      } else {
        nodes.push(node);
      }
    });

    if (bufferedChildren.length > 0 && type) {
      nodes.push({
        type: "admonition",
        data: {
          hName: "Admonition",
          hProperties: { type: type, title: title },
        },
        children: bufferedChildren,
      });
    }
    tree.children = nodes;
  };
}

function Markdown({ children }) {
  return (
    <ReactMarkdown
      // @ts-ignore type error due to different dependency versions
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkAdmonition]}
      components={{
        ...MDXComponents,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
