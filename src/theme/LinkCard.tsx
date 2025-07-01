import Link from "@docusaurus/Link";
import { Badge, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { ExternalLinkIcon } from "lucide-react";
import { forwardRef } from "react";

export type LinkCardRootProps = React.ComponentProps<typeof Card> & {
  direction?: "row" | "column";
  children: React.ReactNode;
  as?: React.ComponentType<{ href: string }>;
} & (
    | { href: string }
    | {
        disabled: true;
      }
  );

const LinkCardRoot = forwardRef(
  (
    { children, as, ...props }: LinkCardRootProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const href = "href" in props ? props.href : undefined;
    const Comp = as ?? Link;
    return (
      <Box asChild ref={ref} {...props} width="100%" minWidth="200px">
        <Card asChild size="3">
          <Comp href={href}>
            <Flex direction={props.direction} gap="4">
              {children}
            </Flex>
          </Comp>
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
    }: { children: React.ReactNode } & React.ComponentProps<typeof Heading> & {
        href?: string;
      },
    ref: React.Ref<HTMLHeadingElement>,
  ) => {
    const isExternal = props.href?.startsWith("http");
    return (
      <Flex asChild gap="2" align="center">
        <Heading as="h4" size="3" ref={ref} {...props}>
          {children}
          {isExternal ? <ExternalLinkIcon size={16} /> : null}
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
      <Flex direction="column" gap="1" ref={ref} {...props}>
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
      <Text ref={ref} {...props} color="gray" size="3">
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
    const href = "href" in props ? props.href : undefined;
    return (
      <LinkCardRoot ref={ref} {...props}>
        {!icon ? null : <LinkCardIcon>{icon}</LinkCardIcon>}
        <LinkCardContent>
          <LinkCardTitle href={href}>
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
