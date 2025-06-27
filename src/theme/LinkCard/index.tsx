import { Card, Flex, Heading, Text } from "@radix-ui/themes";
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
      <Card
        asChild
        ref={ref}
        size="3"
        {...props}
        className={styles.linkCardRoot}
      >
        <a href={href}>
          <Flex direction={props.direction} gap="4">
            {children}
          </Flex>
        </a>
      </Card>
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
      <Flex asChild gap="2">
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
      <Flex ref={ref} style={{ color: "var(--accent-11)" }} {...props}>
        {children}
      </Flex>
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
      <Text ref={ref} {...props}>
        {children}
      </Text>
    );
  },
);

type LinkCardCompositeProps = LinkCardRootProps & {
  icon: React.ReactNode;
  title: string;
  content: string;
};

const LinkCardComposite = forwardRef(
  (
    { icon, title, content, ...props }: LinkCardCompositeProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <LinkCardRoot ref={ref} {...props}>
        <LinkCardIcon>{icon}</LinkCardIcon>
        <LinkCardContent>
          <LinkCardTitle>{title}</LinkCardTitle>
          <LinkCardDescription>{content}</LinkCardDescription>
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
