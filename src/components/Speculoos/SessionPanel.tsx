/**
 * A realtime session at a glance, as a compact sequence diagram: what the
 * client sends on the left, what the server sends on the right, in the order
 * they pass, with the audio/transcript loop bracketed. Each message links to
 * its card in the reference, and opens to its example where it has one.
 *
 * It replaces the protocol overview's Mermaid diagram, beside the reference
 * rather than above it. The order is this site's knowledge, not the spec's:
 * AsyncAPI cannot say which message follows which.
 */
import type { ApiEntry, WsMessage } from "@speculoos/core";
import { Box, Card, Flex, Heading, Link, Separator, Text } from "@radix-ui/themes";
import CodeBlock from "@theme/CodeBlock";
import { useState, type ReactNode } from "react";

/** One step of the session: a message, or a run of them that repeats. */
type Step = { message: string } | { repeat: string[]; label: string };

const SESSION: Step[] = [
  { message: "StartRecognition" },
  { message: "RecognitionStarted" },
  {
    repeat: ["AddAudio", "AudioAdded", "AddPartialTranscript", "AddTranscript"],
    label: "while audio streams",
  },
  { message: "EndOfStream" },
  { message: "EndOfTranscript" },
];

/** Messages that can arrive at any point, rather than at a place in the sequence. */
const ANY_TIME = ["Info", "Warning", "Error"];

type Located = { message: WsMessage; sends: "client" | "server" };

/** Every message on the channel by name, with which side sends it. */
function messagesOf(entry: ApiEntry): Map<string, Located> {
  const out = new Map<string, Located>();
  for (const operation of entry.endpoint.operations) {
    if (operation.kind !== "message") continue;
    const sends = operation.direction === "client-sends" ? "client" : "server";
    for (const message of operation.messages) out.set(message.name, { message, sends });
  }
  return out;
}

function Row({ found }: { found: Located }): ReactNode {
  const [open, setOpen] = useState(false);
  const { message, sends } = found;
  const example = message.examples[0];
  const client = sends === "client";
  const name = (
    <Link href={`#${message.slug ?? ""}`} size="2" color="gray" highContrast underline="hover">
      {message.name}
    </Link>
  );
  const arrow = (
    <Text size="2" color="cyan" aria-label={client ? "client sends" : "server sends"}>
      {client ? "↑" : "↓"}
    </Text>
  );
  const toggle =
    example === undefined ? null : (
      <Text
        asChild
        size="1"
        color="gray"
        style={{ cursor: "pointer", background: "none", border: 0, padding: 0 }}
      >
        <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} title="Example">
          {open ? "▾" : "▸"}
        </button>
      </Text>
    );
  return (
    <Box>
      <Flex align="center" gap="2" justify={client ? "start" : "end"} py="1">
        {client ? (
          <>
            {arrow}
            {name}
            {toggle}
          </>
        ) : (
          <>
            {toggle}
            {name}
            {arrow}
          </>
        )}
      </Flex>
      {open && example !== undefined && (
        <Box my="2">
          {example.summary !== undefined && (
            <Text as="p" size="1" color="gray" mb="1">
              {example.summary}
            </Text>
          )}
          <CodeBlock language="json">{JSON.stringify(example.payload, null, 2)}</CodeBlock>
        </Box>
      )}
    </Box>
  );
}

function Rows({ names, messages }: { names: string[]; messages: Map<string, Located> }): ReactNode {
  return (
    <>
      {names.map((name) => {
        const found = messages.get(name);
        return found === undefined ? null : <Row key={name} found={found} />;
      })}
    </>
  );
}

export function SessionPanel({ entry }: { entry: ApiEntry }): ReactNode {
  if (entry.kind !== "channel") return null;
  const messages = messagesOf(entry);
  return (
    <Box>
      <Heading as="h3" size="5" mb="3">
        Session
      </Heading>
      <Card size="2">
        <Flex justify="between" mb="2">
          <Text size="1" color="gray" weight="medium">Client</Text>
          <Text size="1" color="gray" weight="medium">Server</Text>
        </Flex>
        <Flex align="center" justify="center" gap="2" py="1">
          <Text size="2" color="gray">⇅</Text>
          <Link href={`#${entry.endpoint.slug}`} size="2" color="gray" highContrast underline="hover">
            Handshake
          </Link>
        </Flex>
        {SESSION.map((step, i) =>
          "message" in step ? (
            <Rows key={i} names={[step.message]} messages={messages} />
          ) : (
            <Box
              key={i}
              my="2"
              px="2"
              style={{ border: "1px dashed var(--gray-a6)", borderRadius: "var(--radius-2)" }}
            >
              <Text as="div" size="1" color="gray" mt="1">
                repeat {step.label}
              </Text>
              <Rows names={step.repeat} messages={messages} />
            </Box>
          ),
        )}
        <Separator size="4" my="2" />
        <Text as="div" size="1" color="gray" mb="1">
          at any time
        </Text>
        <Rows names={ANY_TIME} messages={messages} />
      </Card>
    </Box>
  );
}
