import React from "react";

import ApiCodeBlock from "@theme/ApiExplorer/ApiCodeBlock";

import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

import type sdk from "postman-collection";

import type { CodeSample } from "./code-snippets-types";

export interface Props {
  postman: sdk.Request;
  codeSamples: CodeSample[];
}

function CodeSnippets({ codeSamples }: Props) {
  if (!codeSamples.length) {
    return null;
  }

  return (
    <Tabs>
      {codeSamples.map((sample) => (
        <TabItem key={sample.lang} value={sample.lang} label={sample.lang}>
          <ApiCodeBlock language={sample.lang}>{sample.source}</ApiCodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );
}

export default CodeSnippets;
