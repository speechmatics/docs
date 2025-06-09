/**
 *
 * This file is only being Swizzled to deal with the missing const-value
 * rendering. It has been implemented upstream, but not yet released.
 *
 * See line here: https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/blob/912f7d6191333d76784f5dda0818d6b431952b9b/packages/docusaurus-theme-openapi-docs/src/theme/SchemaItem/index.tsx#L166C1-L188C4
 *
 * TODO when docusaurus-plugin-openapi-docs version >4.4.0 comes out (hopefully in the coming days), update the package and remove this file.
 */

import React, { type ReactNode } from "react";

// @ts-ignore This whole file will be removed when upstream is updated
import Markdown from "@theme/Markdown";
import clsx from "clsx";

function guard<T>(value: T | undefined | string, cb: (value: T) => ReactNode) {
  if (!!value || value === 0) {
    const children = cb(value as T);
    return render(children);
  }
  return "";
}

function render(children: ReactNode) {
  if (Array.isArray(children)) {
    return children.filter((c) => c !== undefined).join("");
  }
  return children ?? "";
}

export interface Props {
  children?: ReactNode;
  collapsible?: boolean;
  name?: string;
  qualifierMessage?: string | undefined;
  required?: boolean;
  schemaName?: string;
  // TODO should probably be typed
  // biome-ignore lint/suspicious/noExplicitAny: This whole file will be removed when upstream is updated
  schema?: any;
  discriminator?: boolean;
}

const transformEnumDescriptions = (
  enumDescriptions?: Record<string, string>,
) => {
  if (enumDescriptions) {
    return Object.entries(enumDescriptions);
  }

  return [];
};

const getEnumDescriptionMarkdown = (enumDescriptions?: [string, string][]) => {
  if (enumDescriptions?.length) {
    return `| Enum Value | Description |
| ---- | ----- |
${enumDescriptions
  .map((desc) => {
    return `| ${desc[0]} | ${desc[1]} | `.replaceAll("\n", "<br/>");
  })
  .join("\n")}
    `;
  }

  return "";
};

export default function SchemaItem(props: Props) {
  const {
    children: collapsibleSchemaContent,
    collapsible,
    name,
    qualifierMessage,
    required,
    schemaName,
    schema,
  } = props;
  console.log(qualifierMessage);

  // biome-ignore lint/suspicious/noImplicitAnyLet: This whole file will be removed when upstream is updated
  let deprecated;
  // biome-ignore lint/suspicious/noImplicitAnyLet: This whole file will be removed when upstream is updated
  let schemaDescription;
  let defaultValue: string | undefined;
  let example: string | undefined;
  // biome-ignore lint/suspicious/noImplicitAnyLet: This whole file will be removed when upstream is updated
  let nullable;
  let enumDescriptions: [string, string][] = [];
  let constValue: string | undefined;

  if (schema) {
    deprecated = schema.deprecated;
    schemaDescription = schema.description;
    enumDescriptions = transformEnumDescriptions(schema["x-enumDescriptions"]);
    defaultValue = schema.default;
    example = schema.example;
    nullable =
      schema.nullable ||
      (Array.isArray(schema.type) && schema.type.includes("null")); // support JSON Schema nullable
    if (schema.const) {
      constValue = schema.const;
    }
  }

  const renderRequired = guard(
    Array.isArray(required) ? required.includes(name) : required,
    () => <span className="openapi-schema__required">required</span>,
  );

  const renderDeprecated = guard(deprecated, () => (
    <span className="openapi-schema__deprecated">deprecated</span>
  ));

  const renderNullable = guard(nullable, () => (
    <span className="openapi-schema__nullable">nullable</span>
  ));

  const renderEnumDescriptions = guard(
    getEnumDescriptionMarkdown(enumDescriptions),
    (value) => {
      return (
        <div style={{ marginTop: ".5rem" }}>
          <Markdown>{value}</Markdown>
        </div>
      );
    },
  );

  const renderSchemaDescription = guard(schemaDescription, (description) => (
    <>
      <Markdown>{description}</Markdown>
    </>
  ));

  const renderQualifierMessage = guard(qualifierMessage, (message) => (
    <>
      <Markdown>{message.replace(/^\*\*|\*\*:|\*\*/g, "")}</Markdown>
    </>
  ));

  // https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/blob/912f7d6191333d76784f5dda0818d6b431952b9b/packages/docusaurus-theme-openapi-docs/src/theme/SchemaItem/index.tsx#L166
  function renderConstValue() {
    if (constValue !== undefined) {
      if (typeof constValue === "string") {
        return (
          <div>
            <span>Constant value: </span>
            <span>
              <code>{constValue}</code>
            </span>
          </div>
        );
      }
      return (
        <div>
          <strong>Constant value: </strong>
          <span>
            <code>{JSON.stringify(constValue)}</code>
          </span>
        </div>
      );
    }
    return undefined;
  }

  function renderDefaultValue() {
    if (defaultValue !== undefined) {
      if (typeof defaultValue === "string") {
        return (
          <div>
            <strong>Default value: </strong>
            <span>
              <code>{defaultValue}</code>
            </span>
          </div>
        );
      }
      return (
        <div>
          <strong>Default value: </strong>
          <span>
            <code>{JSON.stringify(defaultValue)}</code>
          </span>
        </div>
      );
    }
    return undefined;
  }

  function renderExample() {
    if (example !== undefined) {
      if (typeof example === "string") {
        return (
          <div>
            <strong>Example: </strong>
            <span>
              <code>{example}</code>
            </span>
          </div>
        );
      }
      return (
        <div>
          <strong>Example: </strong>
          <span>
            <code>{JSON.stringify(example)}</code>
          </span>
        </div>
      );
    }
    return undefined;
  }

  const schemaContent = (
    <div>
      <span className="openapi-schema__container">
        <strong
          className={clsx("openapi-schema__property", {
            "openapi-schema__strikethrough": deprecated,
          })}
        >
          {name}
        </strong>
        <span className="openapi-schema__name">
          {Array.isArray(schemaName) ? schemaName.join(" | ") : schemaName}
        </span>
        {(nullable || required || deprecated) && (
          <span className="openapi-schema__divider" />
        )}
        {renderNullable}
        {renderRequired}
        {renderDeprecated}
      </span>
      {renderSchemaDescription}
      {renderEnumDescriptions}
      {renderQualifierMessage}
      {renderConstValue()}
      {renderDefaultValue()}
      {renderExample()}
      {collapsibleSchemaContent ?? collapsibleSchemaContent}
    </div>
  );

  return (
    <div className="openapi-schema__list-item">
      {collapsible ? collapsibleSchemaContent : schemaContent}
    </div>
  );
}
