import type { WrapperProps } from "@docusaurus/types";
import { Card } from "@radix-ui/themes";
import DocCard from "@theme-original/DocCard";
import type DocCardType from "@theme/DocCard";
import React, { type ReactNode } from "react";

type Props = WrapperProps<typeof DocCardType>;

export default function DocCardWrapper(props: Props): ReactNode {
  return (
    <Card asChild>
      <DocCard {...props} />
    </Card>
  );
}
