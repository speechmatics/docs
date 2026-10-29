import {
  Box,
  Card,
  Flex,
  Heading,
  HoverCard,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
/**
 * A realtime session at a glance, as a compact sequence diagram: what the
 * client sends on the left, what the server sends on the right, in the order
 * they pass, with the audio/transcript loop bracketed. Each message links to
 * its card in the reference; hovering it shows its example, where it has one.
 *
 * It replaces the protocol overview's Mermaid diagram, beside the reference
 * rather than above it. The order is this site's knowledge, not the spec's:
 * AsyncAPI cannot say which message follows which. So each channel's session
 * is written out below, by channel id; a channel without one has no panel.
 */
import type { ApiEntry, WsMessage } from "@speculoos/core";
import CodeBlock from "@theme/CodeBlock";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

/** One step of the session: a message, or a run of them that repeats. */
type Step = { message: string } | { repeat: string[]; label: string };

interface Session {
  steps: Step[];
  /** Messages that can arrive at any point, rather than at a place in the sequence. */
  anyTime: string[];
}

const SESSIONS: Record<string, Session> = {
  realtime: {
    steps: [
      { message: "StartRecognition" },
      { message: "RecognitionStarted" },
      {
        repeat: [
          "AddAudio",
          "AudioAdded",
          "AddPartialTranscript",
          "AddTranscript",
        ],
        label: "while audio streams",
      },
      { message: "EndOfStream" },
      { message: "EndOfTranscript" },
    ],
    anyTime: ["Info", "Warning", "Error"],
  },
  agent: {
    steps: [
      { message: "StartRecognition" },
      { message: "RecognitionStarted" },
      {
        repeat: [
          "AddAudio",
          "AudioAdded",
          "SpeechStarted",
          "StartOfTurn",
          "AddPartialSegment",
          "AddSegment",
          "SpeechEnded",
          "EndOfTurn",
        ],
        label: "for each turn, while audio streams",
      },
      { message: "EndOfStream" },
      { message: "EndOfTranscript" },
    ],
    anyTime: ["Info", "Warning", "Error"],
  },
};

type Located = { message: WsMessage; sends: "client" | "server" };

/** Every message on the channel by name, with which side sends it. */
function messagesOf(entry: ApiEntry): Map<string, Located> {
  const out = new Map<string, Located>();
  for (const operation of entry.endpoint.operations) {
    if (operation.kind !== "message") continue;
    const sends = operation.direction === "client-sends" ? "client" : "server";
    for (const message of operation.messages)
      out.set(message.name, { message, sends });
  }
  return out;
}

function Row({ found }: { found: Located }): ReactNode {
  const { message, sends } = found;
  const example = message.examples[0];
  const client = sends === "client";
  const link = (
    <Link
      href={`#${message.slug ?? ""}`}
      size="2"
      color="gray"
      highContrast
      underline="hover"
    >
      {message.name}
    </Link>
  );
  // The example on hover. A hover card is for pointers only; keyboard and
  // touch readers lose nothing by it, since the link goes to the message's
  // card, examples and all.
  const name =
    example === undefined ? (
      link
    ) : (
      <HoverCard.Root openDelay={300}>
        <HoverCard.Trigger>{link}</HoverCard.Trigger>
        <HoverCard.Content
          size="1"
          side="left"
          align="start"
          width="360px"
          maxHeight="60vh"
        >
          {example.summary !== undefined && (
            <Text as="p" size="1" color="gray" mb="1">
              {example.summary}
            </Text>
          )}
          <CodeBlock language="json">
            {JSON.stringify(example.payload, null, 2)}
          </CodeBlock>
        </HoverCard.Content>
      </HoverCard.Root>
    );
  const arrow = (
    <Text
      size="2"
      color="teal"
      aria-label={client ? "client sends" : "server sends"}
    >
      {client ? "↑" : "↓"}
    </Text>
  );
  return (
    <Flex align="center" gap="2" justify={client ? "start" : "end"} py="1">
      {client ? (
        <>
          {arrow}
          {name}
        </>
      ) : (
        <>
          {name}
          {arrow}
        </>
      )}
    </Flex>
  );
}

function Rows({
  names,
  messages,
}: {
  names: string[];
  messages: Map<string, Located>;
}): ReactNode {
  return (
    <>
      {names.map((name) => {
        const found = messages.get(name);
        return found === undefined ? null : <Row key={name} found={found} />;
      })}
    </>
  );
}

/** Whether a channel has a session to show. */
export function hasSessionPanel(entry: ApiEntry): boolean {
  return entry.kind === "channel" && entry.endpoint.id in SESSIONS;
}

/**
 * `collapsed` is for above the reference, where there is no room beside it: a
 * card that opens to the diagram, so a phone's reader gets to the reference
 * without scrolling past it, and can still find it there.
 */
export function SessionPanel({
  entry,
  collapsed = false,
}: {
  entry: ApiEntry;
  collapsed?: boolean;
}): ReactNode {
  if (entry.kind !== "channel") return null;
  const session = SESSIONS[entry.endpoint.id];
  if (session === undefined) return null;
  const messages = messagesOf(entry);
  const diagram = (
    <>
      <Flex justify="between" mb="2">
        <Text size="1" color="gray" weight="medium">
          Client
        </Text>
        <Text size="1" color="gray" weight="medium">
          Server
        </Text>
      </Flex>
      <Flex align="center" justify="center" gap="2" py="1">
        <Text size="2" color="gray">
          ⇅
        </Text>
        <Link
          href={`#${entry.endpoint.slug}`}
          size="2"
          color="gray"
          highContrast
          underline="hover"
        >
          Handshake
        </Link>
      </Flex>
      {session.steps.map((step) =>
        "message" in step ? (
          <Rows key={step.message} names={[step.message]} messages={messages} />
        ) : (
          <Box
            key={step.label}
            my="2"
            px="2"
            style={{
              border: "1px dashed var(--gray-a6)",
              borderRadius: "var(--radius-2)",
            }}
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
      <Rows names={session.anyTime} messages={messages} />
    </>
  );
  if (collapsed)
    return (
      <Card size="2">
        <details className={styles.collapsible}>
          <summary>
            <Text size="3" weight="bold">
              Session
            </Text>{" "}
            <Text size="2" color="gray">
              — which messages pass, in order
            </Text>
          </summary>
          <Box mt="3">{diagram}</Box>
        </details>
      </Card>
    );
  return (
    <Box>
      <Heading as="h3" size="5" mb="3">
        Session
      </Heading>
      <Card size="2">{diagram}</Card>
    </Box>
  );
}
