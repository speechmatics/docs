import type { MessageObject } from "@asyncapi/parser/esm/spec-types/v3";
import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Callout,
  Text,
} from "@radix-ui/themes";
import CodeBlock from "@theme/CodeBlock";
import CodeInline from "@theme/CodeInline";
import Heading from "@theme/Heading";
import Markdown from "@theme/Markdown";
import SchemaNode from "@theme/Schema";
import { BracesIcon, InfoIcon } from "lucide-react";
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
    <Card size="1">
      <Flex direction="column" my="3">
        <Flex justify="between">
          <Flex asChild gap="1" align="center">
            <Heading
              as="h3"
              id={messageName.toLowerCase()}
              style={{
                scrollMarginTop: "calc(var(--ifm-navbar-height) + 0.5rem)",
              }}
            >
              <WebsocketMessageArrow
                direction={channel === "publish" ? "up" : "down"}
              />{" "}
              {messageName}
            </Heading>
          </Flex>
          {!!message.payload.example && (
            <MessageExample
              title={messageName}
              exampleJSON={JSON.stringify(message.payload.example, null, 2)}
            />
          )}
        </Flex>
        <Flex direction="column" gap="2">
          {!!message["x-available-deployments"] && (
            <Flex>
              <Callout.Root size="1" color="gray">
                <Callout.Icon>
                  <InfoIcon size="12" />
                </Callout.Icon>
                <Callout.Text>
                  Currently available in{" "}
                  <Text weight="bold">
                    {message["x-available-deployments"].join(" and ")}
                  </Text>{" "}
                  deployments
                </Callout.Text>
              </Callout.Root>
            </Flex>
          )}
          <Markdown>{message.summary || "No summary"}</Markdown>
          <SchemaNode schema={message.payload} />
        </Flex>
      </Flex>
    </Card>
  );
}

function MessageExample({
  title,
  exampleJSON,
}: { title: string; exampleJSON: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" variant="soft" color="gray" mb="3">
          <BracesIcon size="12" />
          See example
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          Example of a <CodeInline>{title}</CodeInline> message
        </Dialog.Description>
        <Box mt="4">
          <CodeBlock language="json">{exampleJSON}</CodeBlock>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
