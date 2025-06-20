---
sidebar_label: Setup
---

:::warning
This page is a work in progress
:::

# Flow setup
A voice agent template covers multiple elements that typically need to be configured in concert to power a specific class of conversations in a human-facing application. 

Flow can be configured using the following parameters:

`template_id` - Required in the the StartConversation message in the Flow API. Generated from the Speechmatics [Portal](https://portal.speechmatics.com/). This maps to the [language supported](/voice-agents-flow/supported-languages), agent's prompt, LLM, TTS voice, & custom dictionary. These can be customised by creating or modifying agents in the [portal](https://portal.speechmatics.com/).

For more details, refer to [StartConversation API reference](/api-ref/flow-voice-ai-websocket#startconversation).

### Function Calling

[Function Calling](/voice-agents-flow/features/function-calling) allows you to connect Flow to external tools and systems. This unlocks Flow's ability to act in the real-world and better serve the needs of your users.

This could involve needing real-time information such as opening/closing times or validation services for authentication or action APIs that control a fast food system while placing a drive-thru order.


### Moderating & controlling Conversations
You might want to control ongoing conversation based on what's spoken by the user or the output by the LLM. This could involve situations where the agent is asked to do things out of scope or the conversation is heading in unintentional directions. We enable this through sharing the real-time transcript from speech (AddPartialTranscript/ AddTranscript) and the entire response from the LLM just before it begins to speak (ResponseStarted). We recommend building monitoring on top of these streams and to use either AudioEnded to end the session, or close the WebSocket directly if the final transcript is unimportant.

#### Steering the conversation
[Application Inputs](/voice-agents-flow/features/application-inputs) allow you to steer the conversation by adding helpful updates & information asynchronously to Flow

### Managing call recordings & transcripts

Clients are responsible for  maintaining their own recordings & conversation logs. This is enabled through the audio already being routed entirely through the client, and conversation transcripts being provided in real-time through AddPartialTranscript/AddTranscript/ ResponseStarted/ ResponseCompleted/ ResponseInterrupted.

### Internet Search

Internet Search allows your agent to look up information such as the weather and the news by accessing the internet.

Internet Search is currently only available when using the official [iPhone](https://apps.apple.com/us/app/speechmatics-flow/id6673918783) or [Android](https://play.google.com/store/apps/details?id=com.speechmatics.flowapp) applications, or for Enterprise customers.
