import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";
import DocBreadcrumbsttructuredData from "@theme/DocBreadcrumbs/StructuredData";
import React, { Fragment, type ReactNode } from "react";

import { Flex, Text } from "@radix-ui/themes";
import { ChevronRightIcon } from "lucide-react";

// TODO: Investigate a11y implications of this component
export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();

  if (!breadcrumbs) {
    return null;
  }

  // TODO: Could use toSpliced here instead, but some browsers don't support it in 2025. Update when this changes
  const spliced = [...breadcrumbs];
  spliced.splice(-1, 1);

  return (
    <>
      <DocBreadcrumbsttructuredData breadcrumbs={breadcrumbs} />
      <Flex gap="2" align="center">
        {spliced.map((item, idx, { length }) => {
          if (item.type !== "category" && !item.docId?.includes("index")) {
            return null;
          }
          const isTopLevel = item.type === "category" && !item.collapsible;
          const showChevron = item.type === "category" && idx !== length - 1;

          return (
            <Fragment key={item.label}>
              <Text
                size="2"
                weight="medium"
                color="gray"
                style={isTopLevel ? { textTransform: "uppercase" } : {}}
              >
                {item.label}
              </Text>
              {showChevron && <ChevronRightIcon size={16} />}
            </Fragment>
          );
        })}
      </Flex>
    </>
  );
}
