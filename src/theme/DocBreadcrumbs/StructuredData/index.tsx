import Head from "@docusaurus/Head";
import { useBreadcrumbsttructuredData } from "@docusaurus/plugin-content-docs/client";
import type { Props } from "@theme/DocBreadcrumbs/StructuredData";
import React, { type ReactNode } from "react";

export default function DocBreadcrumbsttructuredData(props: Props): ReactNode {
  const structuredData = useBreadcrumbsttructuredData({
    breadcrumbs: props.breadcrumbs,
  });
  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}
