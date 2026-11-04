import { usePrismTheme } from "@docusaurus/theme-common";
import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import type { Props } from "@theme/CodeBlock/Content";
import Line from "@theme/CodeBlock/Line";
import clsx from "clsx";
import { Highlight } from "prism-react-renderer";
import React, { type ComponentProps, type ReactNode } from "react";

import styles from "./styles.module.css";

// TODO Docusaurus v4: remove useless forwardRef
const Pre = React.forwardRef<HTMLPreElement, ComponentProps<"pre">>(
  (props, ref) => {
    return (
      <pre
        ref={ref}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: lets keyboard users scroll the code
        tabIndex={0}
        {...props}
        className={clsx(props.className, styles.codeBlock, "thin-scrollbar")}
      />
    );
  },
);

function Code(props: ComponentProps<"code">) {
  const { metadata } = useCodeBlockContext();
  return (
    <code
      {...props}
      className={clsx(
        props.className,
        styles.codeBlockLines,
        metadata.lineNumbersStart !== undefined &&
          styles.codeBlockLinesWithNumbering,
      )}
      style={{
        ...props.style,
        counterReset:
          metadata.lineNumbersStart === undefined
            ? undefined
            : `line-count ${metadata.lineNumbersStart - 1}`,
      }}
    />
  );
}

export default function CodeBlockContent({
  className: classNameProp,
}: Props): ReactNode {
  const { metadata, wordWrap } = useCodeBlockContext();
  const prismTheme = usePrismTheme();
  const { code, language, lineNumbersStart, lineClassNames } = metadata;
  return (
    <Highlight theme={prismTheme} code={code} language={language}>
      {({
        className,
        // Drop the Prism theme background so the Card surface shows through
        style: { backgroundColor, ...style },
        tokens: lines,
        getLineProps,
        getTokenProps,
      }) => (
        <Pre
          ref={wordWrap.codeBlockRef}
          className={clsx(classNameProp, className)}
          style={style}
        >
          <Code>
            {lines.map((line, i) => (
              <Line
                // biome-ignore lint/suspicious/noArrayIndexKey: lines never reorder
                key={i}
                line={line}
                getLineProps={getLineProps}
                getTokenProps={getTokenProps}
                classNames={lineClassNames[i]}
                showLineNumbers={lineNumbersStart !== undefined}
              />
            ))}
          </Code>
        </Pre>
      )}
    </Highlight>
  );
}
