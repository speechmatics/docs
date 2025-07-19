import Link from "@docusaurus/Link";
import {
  useActiveDocContext,
  useLayoutDoc,
} from "@docusaurus/plugin-content-docs/client";
import { Button, Flex } from "@radix-ui/themes";
import type { Props } from "@theme/NavbarItem/DocNavbarItem";
import React, { type ReactNode } from "react";
import styles from "./styles.module.css";

export default function DocNavbarItem({
  docId,
  label: staticLabel,
  docsPluginId,
  ...props
}: Props): ReactNode {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const doc = useLayoutDoc(docId, docsPluginId);
  const pageActive = activeDoc?.path === doc?.path;

  // Draft and unlisted items are not displayed in the navbar.
  if (doc === null || (doc.unlisted && !pageActive)) {
    return null;
  }

  const isActive =
    pageActive || (!!activeDoc?.sidebar && activeDoc.sidebar === doc.sidebar);

  return (
    <Flex asChild display={{ initial: "none", md: "flex" }}>
      <Button
        asChild
        variant="soft"
        color="gray"
        className={!isActive ? styles.inactive : ""}
      >
        <Link to={doc.path}>{staticLabel ?? doc.id}</Link>
      </Button>
    </Flex>
  );
}
