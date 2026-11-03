import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {Box, Inset, Separator, Text} from '@radix-ui/themes';
import {useCodeBlockContext} from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import type {Props} from '@theme/CodeBlock/Layout';
import Buttons from '@theme/CodeBlock/Buttons';

export default function CodeBlockLayout({className}: Props): ReactNode {
  const {metadata} = useCodeBlockContext();
  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {/* Content runs edge to edge; the code itself sets its own padding */}
      <Inset side="all" clip="padding-box">
        {metadata.title && (
          <>
            <Box px="3" py="2">
              <Text as="div" size="2" weight="medium">
                <Title>{metadata.title}</Title>
              </Text>
            </Box>
            <Separator size="4" />
          </>
        )}
        <Box position="relative" dir="ltr">
          <Content />
          <Buttons />
        </Box>
      </Inset>
    </Container>
  );
}
