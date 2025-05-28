import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import isInternalUrl from "@docusaurus/isInternalUrl";
import {
  findFirstSidebarItemLink,
  useDocById,
} from "@docusaurus/plugin-content-docs/client";
import { usePluralForm } from "@docusaurus/theme-common";
import clsx from "clsx";
import React, { type ReactNode } from "react";

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import type { Props } from "@theme/DocCard";
import Heading from "@theme/Heading";

import { Card, Text } from "@radix-ui/themes";

function useCategoryItemsPlural() {
  const { selectMessage } = usePluralForm();
  return (count: number) =>
    selectMessage(
      count,
      translate(
        {
          message: "1 item|{count} items",
          id: "theme.docs.DocCard.categoryDescription.plurals",
          description:
            "The default description for a category card in the generated index about how many items this category includes",
        },
        { count },
      ),
    );
}

function CardLayout({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): ReactNode {
  return (
    <Card size="3" asChild>
      <Link href={href}>
        <Heading as="h2" className={clsx("text--truncate")} title={title}>
          {icon} {title}
        </Heading>
        {description && (
          <Text asChild color="gray">
            <p className={clsx("text--truncate")} title={description}>
              {description}
            </p>
          </Text>
        )}
      </Link>
    </Card>
  );
}

function CardCategory({ item }: { item: PropSidebarItemCategory }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): ReactNode {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
