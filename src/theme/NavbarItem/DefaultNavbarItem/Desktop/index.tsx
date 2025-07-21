import { Button } from "@radix-ui/themes";
import type { Props } from "@theme/NavbarItem/DefaultNavbarItem/Desktop";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import clsx from "clsx";
import React, { type ReactNode } from "react";
import styles from "./styles.module.css";

export default function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: Props): ReactNode {
  const element = (
    <Button
      color="gray"
      variant="ghost"
      className={clsx(
        isDropdownItem ? "dropdown__link" : "navbar__item navbar__link",
        className,
        styles.navbar__item,
      )}
      style={{ margin: 0 }}
      asChild
    >
      <NavbarNavLink isDropdownLink={isDropdownItem} {...props} />
    </Button>
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
}
