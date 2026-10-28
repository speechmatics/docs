import React, { type ComponentType } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MDXComponents from "../MDXComponents";
import remarkAdmonition from "./remark-admonition";

/**
 * react-markdown 8 hands custom components props of its own — `node` on
 * every one, `inline` on `code`, `ordered`, `depth`, `index` and `checked` on
 * lists — and the MDX components pass every prop on to the DOM. So each is
 * wrapped to drop them first.
 */
function withoutMarkdownProps(
  Component: ComponentType<Record<string, unknown>>,
) {
  return ({
    node,
    inline,
    ordered,
    depth,
    index,
    checked,
    ...props
  }: Record<string, unknown>) => <Component {...props} />;
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
