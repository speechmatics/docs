import React, { useState, useEffect, type JSX } from "react";

// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ApiCodeBlock from "@theme/ApiExplorer/ApiCodeBlock";
// import buildPostmanRequest from "@theme/ApiExplorer/buildPostmanRequest";
// import { useTypedSelector } from "@theme/ApiItem/hooks";

import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";

// import cloneDeep from "lodash/cloneDeep";
// import codegen from "postman-code-generators";
import type sdk from "postman-collection";

import type { CodeSample, Language } from "./code-snippets-types";

export interface Props {
  postman: sdk.Request;
  codeSamples: CodeSample[];
}

function CodeSnippets({ postman, codeSamples }: Props) {
  // const contentType = useTypedSelector((state: any) => state.contentType.value);
  // const accept = useTypedSelector((state: any) => state.accept.value);
  // const server = useTypedSelector((state: any) => state.server.value);
  // const body = useTypedSelector((state: any) => state.body);

  // const pathParams = useTypedSelector((state: any) => state.params.path);
  // const queryParams = useTypedSelector((state: any) => state.params.query);
  // const cookieParams = useTypedSelector((state: any) => state.params.cookie);
  // const headerParams = useTypedSelector((state: any) => state.params.header);

  // const auth = useTypedSelector((state: any) => state.auth);
  // const clonedAuth = cloneDeep(auth);
  // let placeholder: string;

  // function cleanCredentials(obj: any) {
  //   for (const key in obj) {
  //     if (typeof obj[key] === "object" && obj[key] !== null) {
  //       // use name as placeholder if exists
  //       const comboAuthId = Object.keys(obj).join(" and ");
  //       const authOptions =
  //         clonedAuth?.options?.[key] ?? clonedAuth?.options?.[comboAuthId];
  //       placeholder = authOptions?.[0]?.name;
  //       obj[key] = cleanCredentials(obj[key]);
  //     } else {
  //       obj[key] = `<${placeholder ?? key}>`;
  //     }
  //   }

  //   return obj;
  // }

  // scrub credentials from code snippets
  // const cleanedAuth = {
  //   ...clonedAuth,
  //   data: cleanCredentials(clonedAuth.data),
  // };

  // Create a Postman request object using cleanedAuth
  // const cleanedPostmanRequest = buildPostmanRequest(postman, {
  //   queryParams,
  //   pathParams,
  //   cookieParams,
  //   contentType,
  //   accept,
  //   headerParams,
  //   body,
  //   server,
  //   auth: cleanedAuth,
  // });

  return (
    <Tabs>
      {codeSamples.map((sample) => (
        <TabItem key={sample.lang} value={sample.lang} label={sample.lang}>
          <ApiCodeBlock language={sample.lang}>{sample.source}</ApiCodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );

  // return (
  //   <>
  //     {/* Outer language tabs */}
  //     <CodeTabs
  //       groupId="code-samples"
  //       action={{
  //         setLanguage: (...args) => console.log("set language", args),
  //         setSelectedVariant: (...args) => console.log("set selected variant", args),
  //         setSelectedSample: (...args) => console.log("set selected sample", args),
  //       }}
  //       languageSet={codeSamples.map(s => ({...s, variants: []}))}
  //       defaultValue={codeSamples[0].lang}
  //       lazy
  //     >
  //       {codeSamples.map((sample) => {
  //         return (
  //           <CodeTab
  //             value={sample.lang}
  //             label={sample.lang}
  //             key={sample.lang}
  //             attributes={{
  //               className: `openapi-tabs__code-item--${sample.lang}`,
  //             }}
  //           >
  //             <ApiCodeBlock
  //               language={sample.lang}
  //               className="openapi-explorer__code-block"
  //               showLineNumbers={true}
  //             >
  //               {/* {codeSampleCodeText} */}
  //               TODO
  //             </ApiCodeBlock>
  //           </CodeTab>
  //         );
  //       })}
  //     </CodeTabs>
  //   </>
  // );
}

export default CodeSnippets;
