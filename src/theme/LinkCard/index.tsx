import Link from "@docusaurus/Link";
import { Badge, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { forwardRef } from "react";
import styles from "./LinkCard.module.css";

export type LinkCardRootProps = React.ComponentProps<typeof Card> & {
  direction?: "row" | "column";
  children: React.ReactNode;
} & (
    | { href: string }
    | {
        disabled: true;
      }
  );

const LinkCardRoot = forwardRef(
  (
    { children, ...props }: LinkCardRootProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const href = "href" in props ? props.href : undefined;
    return (
      <Box asChild ref={ref} {...props} width="100%" minWidth="200px">
        <Card asChild size="3" className={styles.linkCardRoot}>
          <Link href={href}>
            <Flex direction={props.direction} gap="4">
              {children}
            </Flex>
          </Link>
        </Card>
      </Box>
    );
  },
);

const LinkCardTitle = forwardRef(
  (
    {
      children,
      ...props
    }: { children: React.ReactNode } & React.ComponentProps<typeof Heading>,
    ref: React.Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Flex asChild gap="2" align="center">
        <Heading as="h3" ref={ref} {...props}>
          {children}
        </Heading>
      </Flex>
    );
  },
);

const LinkCardIcon = forwardRef(
  (
    { children, ...props }: { children: React.ReactNode },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Flex ref={ref} style={{ color: "var(--accent-8)" }} {...props}>
        {children}
      </Flex>
    );
  },
);

const LinkCardBadge = forwardRef(
  (
    { children, ...props }: { children: React.ReactNode },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Badge
        ref={ref}
        radius="full"
        color="gray"
        variant="solid"
        highContrast
        size="1"
        {...props}
      >
        {children}
      </Badge>
    );
  },
);

const LinkCardContent = forwardRef(
  (
    {
      children,
      ...props
    }: { children: React.ReactNode } & React.ComponentProps<typeof Flex>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Flex direction="column" gap="2" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

const LinkCardDescription = forwardRef(
  (
    {
      children,
      ...props
    }: { children: React.ReactNode } & React.ComponentProps<typeof Text>,
    ref: React.Ref<HTMLParagraphElement>,
  ) => {
    return (
      <Text ref={ref} {...props} color="gray">
        {children}
      </Text>
    );
  },
);

type LinkCardCompositeProps = LinkCardRootProps & {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText?: string;
};

const LinkCardComposite = forwardRef(
  (
    { icon, title, badgeText, description, ...props }: LinkCardCompositeProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <LinkCardRoot ref={ref} {...props}>
        {!icon ? null : <LinkCardIcon>{icon}</LinkCardIcon>}
        <LinkCardContent>
          <LinkCardTitle>
            {title}
            {badgeText ? <LinkCardBadge>{badgeText}</LinkCardBadge> : null}
          </LinkCardTitle>
          <LinkCardDescription>{description}</LinkCardDescription>
        </LinkCardContent>
      </LinkCardRoot>
    );
  },
);

export {
  LinkCardRoot as Root,
  LinkCardTitle as Title,
  LinkCardIcon as Icon,
  LinkCardDescription as Content,
  LinkCardComposite as LinkCard,
};
