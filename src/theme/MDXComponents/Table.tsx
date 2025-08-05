import { Table as RadixTable } from "@radix-ui/themes";
import React, { type ReactNode } from "react";
import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {
  children: ReactNode;
}

interface TableRowProps extends ComponentProps<"tr"> {
  children: ReactNode;
}

interface TableCellProps extends ComponentProps<"td"> {
  children: ReactNode;
}

interface TableHeaderProps extends ComponentProps<"th"> {
  children: ReactNode;
}

// Custom Table component that wraps the default table with custom styling
export default function Table({ children, ...props }: TableProps): ReactNode {
  // return <RadixTable.Root {...props}>{children}</RadixTable.Root>;
  console.log(props);
  // return (
  //   <RadixTable.Root size="1" {...props}>
  //     <RadixTable.Header>
  //       <RadixTable.Row>
  //         <RadixTable.ColumnHeaderCell>Full name</RadixTable.ColumnHeaderCell>
  //         <RadixTable.ColumnHeaderCell>Email</RadixTable.ColumnHeaderCell>
  //       </RadixTable.Row>
  //     </RadixTable.Header>

  //     <RadixTable.Body>
  //       <RadixTable.Row>
  //         <RadixTable.RowHeaderCell>Danilo Sousa</RadixTable.RowHeaderCell>
  //         <RadixTable.Cell>danilo@example.com</RadixTable.Cell>
  //       </RadixTable.Row>
  //       <RadixTable.Row>
  //         <RadixTable.RowHeaderCell>Zahra Ambessa</RadixTable.RowHeaderCell>
  //         <RadixTable.Cell>zahra@example.com</RadixTable.Cell>
  //       </RadixTable.Row>
  //     </RadixTable.Body>
  //   </RadixTable.Root>
  // );
}

// Custom thead component
export function Thead({
  children,
  ...props
}: ComponentProps<"thead">): ReactNode {
  return <RadixTable.Header {...props}>{children}</RadixTable.Header>;
}

// Custom tbody component
export function Tbody({
  children,
  ...props
}: ComponentProps<"tbody">): ReactNode {
  return <RadixTable.Body {...props}>{children}</RadixTable.Body>;
}

// Custom tr component
export function Tr({ children, ...props }: TableRowProps): ReactNode {
  return <RadixTable.Row {...props}>{children}</RadixTable.Row>;
}

// Custom th component
export function Th({ children, ...props }: TableHeaderProps): ReactNode {
  return (
    <RadixTable.ColumnHeaderCell {...props}>
      {children}
    </RadixTable.ColumnHeaderCell>
  );
}

// Custom td component
export function Td({ children, ...props }: TableCellProps): ReactNode {
  return <RadixTable.Cell {...props}>{children}</RadixTable.Cell>;
}
