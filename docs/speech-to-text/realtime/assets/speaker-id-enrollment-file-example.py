import asyncio
import speechmatics
import speechmatics.models
import speechmatics.client
from speechmatics.client import (
    ServerMessageType,
    ClientMessageType
)

API_KEY = "YOUR_API_KEY"
PATH_TO_FILE = "example.wav"
LANGUAGE = "en"
CONNECTION_URL = "wss://eu.rt.speechmatics.com/v2"

async def enroll_speakers():
    handler_tasks: list[asyncio.Task] = []

    transcription_config = speechmatics.models.TranscriptionConfig(**{
            "language": LANGUAGE,
            "diarization": "speaker",
        }
    )

    # Create a transcription client
    client = speechmatics.client.WebsocketClient(
        speechmatics.models.ConnectionSettings(
            url=CONNECTION_URL,
            auth_token=API_KEY,
        )
    )
    # Register the event handler for RecognitionStarted
    # to send the GetSpeakers(final=True) request
    client.add_event_handler(
        ServerMessageType.RecognitionStarted,
        lambda _: handler_tasks.append(
            asyncio.create_task(client.send_message(ClientMessageType.GetSpeakers, {"final": True}))
        ),
    )
    # Register the event handler for SpeakersResult
    # to print the speaker identifiers obtained from the server
    client.add_event_handler(
        ServerMessageType.SpeakersResult,
        lambda message: print(f"[speaker identifiers] {message['speakers']}"),
    )

    with open(PATH_TO_FILE, "rb") as fh:
        await asyncio.create_task(client.run(fh, transcription_config))

    for task in handler_tasks:
        await task

if __name__ == "__main__":
    asyncio.run(enroll_speakers())