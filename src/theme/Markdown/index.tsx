import React from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import MDXComponents from "../MDXComponents";
import remarkAdmonition from "./remark-admonition";

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
