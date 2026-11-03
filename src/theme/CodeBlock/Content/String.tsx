import React, {useEffect, useRef, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {
  CodeBlockContextProvider,
  type CodeBlockMetadata,
  createCodeBlockMetadata,
  useCodeWordWrap,
} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/CodeBlock/Content/String';
import CodeBlockLayout from '@theme/CodeBlock/Layout';

function useCodeBlockMetadata(props: Props): CodeBlockMetadata {
  const {prism} = useThemeConfig();
  return createCodeBlockMetadata({
    code: props.children,
    className: props.className,
    metastring: props.metastring,
    magicComments: prism.magicComments,
    defaultLanguage: prism.defaultLanguage,
    language: props.language,
    title: props.title,
    showLineNumbers: props.showLineNumbers,
  });
}

// Opt in with `<CodeBlock wrap>` or a `wrap` flag in a code fence's metastring.
// Titles are stripped first so `title="wrap"` doesn't count.
function shouldWrap(props: Props & {wrap?: boolean}): boolean {
  if (props.wrap) {
    return true;
  }
  const metastring = props.metastring?.replace(/title=(["']).*?\1/, '') ?? '';
  return /(?:^|\s)wrap(?=\s|$)/.test(metastring);
}

// Word wrap is applied imperatively by Docusaurus, so enable it once on mount
// through the same toggle the button uses. The ref guards against effects
// running twice in development.
function useDefaultWordWrap(
  wordWrap: ReturnType<typeof useCodeWordWrap>,
  enabled: boolean,
) {
  const applied = useRef(false);
  useEffect(() => {
    if (enabled && !applied.current) {
      applied.current = true;
      wordWrap.toggle();
    }
  }, [enabled, wordWrap]);
}

// TODO Docusaurus v4: move this component at the root?
export default function CodeBlockString(props: Props): ReactNode {
  const metadata = useCodeBlockMetadata(props);
  const wordWrap = useCodeWordWrap();
  useDefaultWordWrap(wordWrap, shouldWrap(props));
  return (
    <CodeBlockContextProvider metadata={metadata} wordWrap={wordWrap}>
      <CodeBlockLayout />
    </CodeBlockContextProvider>
  );
}
