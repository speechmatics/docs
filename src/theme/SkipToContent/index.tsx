import { SkipToContentLink } from "@docusaurus/theme-common";
import React, { type ReactNode } from "react";
import styles from "./styles.module.css";

export default function SkipToContent(): ReactNode {
  return <SkipToContentLink className={styles.skipToContent} />;
}
