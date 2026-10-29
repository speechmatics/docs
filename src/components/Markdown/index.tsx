import React, { type ComponentType } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MDXComponents from "@theme/MDXComponents";
import remarkAdmonition from "./remark-admonition";

/**
 * react-markdown hands every custom component the hast `node` it renders, and
 * the MDX components pass every prop on to the DOM. So each is wrapped to drop
 * it first.
 */
function withoutMarkdownProps(
  Component: ComponentType<Record<string, unknown>>,
) {
  return ({ node, ...props }: Record<string, unknown>) => (
    <Component {...props} />
  );
}

const components = Object.fromEntries(
  Object.entries(MDXComponents).map(([name, Component]) => [
    name,
    withoutMarkdownProps(Component as ComponentType<Record<string, unknown>>),
  ]),
);

function Markdown({ children }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm, remarkAdmonition]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

export default Markdown;
