import { Table } from "@radix-ui/themes";
import MDXComponents from "@theme-original/MDXComponents";
import type { ComponentProps } from "react";
import A from "./A";
import Heading from "./Heading";

export default {
  ...MDXComponents,
  // Custom link component
  a: A,
  // Custom heading component
  h1: ({ ...props }) => <Heading {...props} as="h1" />,
  h2: ({ ...props }) => <Heading {...props} as="h2" />,
  h3: ({ ...props }) => <Heading {...props} as="h3" />,
  h4: ({ ...props }) => <Heading {...props} as="h4" />,
  h5: ({ ...props }) => <Heading {...props} as="h5" />,
  h6: ({ ...props }) => <Heading {...props} as="h6" />,
  // Custom table components
  table: ({ children, ...props }: ComponentProps<typeof Table.Root>) => (
    <Table.Root {...props} variant="surface" mb="5">
      {children}
    </Table.Root>
  ),
  thead: ({ children, ...props }: ComponentProps<typeof Table.Header>) => (
    <Table.Header {...props}>{children}</Table.Header>
  ),
  tbody: ({ children, ...props }: ComponentProps<typeof Table.Body>) => (
    <Table.Body {...props}>{children}</Table.Body>
  ),
  tr: ({ children, ...props }: ComponentProps<typeof Table.Row>) => (
    <Table.Row {...props}>{children}</Table.Row>
  ),
  th: ({
    children,
    ...props
  }: ComponentProps<typeof Table.ColumnHeaderCell>) => (
    <Table.ColumnHeaderCell {...props}>{children}</Table.ColumnHeaderCell>
  ),
  td: ({ children, ...props }: ComponentProps<typeof Table.Cell>) => (
    <Table.Cell {...props}>{children}</Table.Cell>
  ),
};
