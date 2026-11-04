import type { Props } from "@theme/CodeBlock/Line";
import LineToken from "@theme/CodeBlock/Line/Token";
import clsx from "clsx";
import React, { type ReactNode } from "react";

import styles from "./styles.module.css";

type Token = Props["line"][number];

// Replaces '\n' by ''
// Historical code, not sure why we even need this :/
function fixLineBreak(line: Token[]) {
  const singleLineBreakToken =
    line.length === 1 && line[0]?.content === "\n" ? line[0] : undefined;

  if (singleLineBreakToken) {
    return [{ ...singleLineBreakToken, content: "" }];
  }

  return line;
}

export default function CodeBlockLine({
  line: lineProp,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): ReactNode {
  const line = fixLineBreak(lineProp);

  const lineProps = getLineProps({
    line,
    className: clsx(classNames, showLineNumbers && styles.codeLine),
  });

  const lineTokens = line.map((token, key) => {
    const tokenProps = getTokenProps({ token });
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: tokens never reorder
      <LineToken key={key} {...tokenProps} line={line} token={token}>
        {tokenProps.children}
      </LineToken>
    );
  });

  return (
    <span {...lineProps}>
      {showLineNumbers ? (
        <>
          <span className={styles.codeLineNumber} />
          <span className={styles.codeLineContent}>{lineTokens}</span>
        </>
      ) : (
        lineTokens
      )}
      <br />
    </span>
  );
}
