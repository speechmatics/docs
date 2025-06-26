import type { MessageObject } from "@asyncapi/parser/esm/spec-types/v3";
import { Card, Flex, Text } from "@radix-ui/themes";
import Heading from "@theme/Heading";
import SchemaNode from "@theme/Schema";
import WebsocketMessageArrow from "./WebsocketMessageArrow";

export function AsyncAPIMessage({
  messageName,
  message,
  channel,
}: {
  messageName: string;
  message: MessageObject;
  channel: "publish" | "subscribe";
}) {
  return (
    <Card style={{ overflow: "unset" }}>
      <Flex direction="column">
        <Heading
          as="h3"
          id={messageName.toLowerCase()}
          style={{ scrollMarginTop: "calc(var(--ifm-navbar-height) + 0.5rem)" }}
        >
          <WebsocketMessageArrow
            direction={channel === "publish" ? "up" : "down"}
          />{" "}
          {messageName}
        </Heading>
        <Flex direction="column" gap="2">
          <Text>{message.summary || "No summary"}</Text>
          <SchemaNode schema={message.payload} />
        </Flex>
      </Flex>
    </Card>
  );
}
