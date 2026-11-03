import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {Flex} from '@radix-ui/themes';
import BrowserOnly from '@docusaurus/BrowserOnly';

import CopyButton from '@theme/CodeBlock/Buttons/CopyButton';
import WordWrapButton from '@theme/CodeBlock/Buttons/WordWrapButton';
import type {Props} from '@theme/CodeBlock/Buttons';

import styles from './styles.module.css';

// Code block buttons are not server-rendered on purpose
// Adding them to the initial HTML is useless and expensive (due to JSX SVG)
// They are hidden by default and require React  to become interactive
export default function CodeBlockButtons({className}: Props): ReactNode {
  return (
    <BrowserOnly>
      {() => (
        <Flex
          position="absolute"
          top="2"
          right="2"
          gap="1"
          className={clsx(className, styles.buttonGroup)}>
          <WordWrapButton />
          <CopyButton />
        </Flex>
      )}
    </BrowserOnly>
  );
}
