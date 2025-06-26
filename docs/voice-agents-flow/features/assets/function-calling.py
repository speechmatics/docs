import asyncio
import io
import sys
import json

import pyaudio

from speechmatics_flow.client import WebsocketClient
from speechmatics_flow.models import (
    ConnectionSettings,
    Interaction,
    AudioSettings,
    ConversationConfig,
    ServerMessageType,
    ClientMessageType,
)
from speechmatics_flow.tool_function_param import ToolFunctionParam

AUTH_TOKEN = "Place your auth token here"

# Example configuration which could add a reminder to a calendar.
reminder_config = ToolFunctionParam(
    type="function",
    function={
        "name": "add_reminder",
        "description": "Use this to schedule reminders. Needs a confirmation.",
        "parameters": {
            "type": "object",
            "properties": {
                "date": {
                    "type": "string",
                    "description": "The date for the reminder in dd/mm/yyyy format",
                },
                "time": {
                    "type": "string",
                    "description": "The time for the reminder in 24 hour hh:mm format",
                },
                "title": {
                    "type": "string",
                    "description": "The title for the reminder",
                },
                "project": {
                    "type": "string",
                    "description": "Which project the reminder is related to. If not provided, leave blank.",
                },
            },
            "required": ["project"],
        },
    },
)


# Callback for handling reminder ToolInvoke in your system.
async def reminder_handler(msg: dict):
    print("Attempting to add reminder")
    print(msg)
    response_message = {
        "message": ClientMessageType.ToolResult,
        "id": msg["id"],
        "status": "ok",  # Used to inform user the status of the function call. Could be "failed" or "rejected".
        "content": "Added reminder successfully to calendar",  # LLM response helper message
    }

    await client.websocket.send(json.dumps(response_message))


# Create a websocket client
client = WebsocketClient(
    ConnectionSettings(
        url="wss://flow.api.speechmatics.com/v1/flow",
        auth_token=AUTH_TOKEN,
    )
)

# Create a buffer to store binary messages sent from the server
audio_buffer = io.BytesIO()


# Create callback function which adds binary messages to audio buffer
def binary_msg_handler(msg: bytes):
    if isinstance(msg, (bytes, bytearray)):
        audio_buffer.write(msg)


# Register the callback which will be called
# when the client receives an audio message from the server
client.add_event_handler(ServerMessageType.AddAudio, binary_msg_handler)

# Handling ToolInvoke message
client.add_event_handler(ServerMessageType.ToolInvoke, reminder_handler)


async def audio_playback(buffer):
    """Read from buffer and play audio back to the user"""
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16, channels=1, rate=16000, output=True)
    try:
        while True:
            # Get the current value from the buffer
            audio_to_play = buffer.getvalue()
            # Only proceed if there is audio data to play
            if audio_to_play:
                # Write the audio to the stream
                stream.write(audio_to_play)
                buffer.seek(0)
                buffer.truncate(0)
            # Pause briefly before checking the buffer again
            await asyncio.sleep(0.05)
    finally:
        stream.close()
        stream.stop_stream()
        p.terminate()


async def main():
    print("Starting...")
    tasks = [
        # Use the websocket to connect to Flow Service and start a conversation
        asyncio.create_task(
            client.run(
                interactions=[Interaction(sys.stdin.buffer)],
                audio_settings=AudioSettings(),
                conversation_config=ConversationConfig(),
                tools=[reminder_config],
            )
        ),
        # Run audio playback handler which streams audio from audio buffer
        asyncio.create_task(audio_playback(audio_buffer)),
    ]
    await asyncio.gather(*tasks)


asyncio.run(main())
