import asyncio
import speechmatics
import speechmatics.models
import speechmatics.client
from speechmatics.client import ServerMessageType

API_KEY = "YOUR_API_KEY"
PATH_TO_FILE = "example.wav"
LANGUAGE = "en"
CONNECTION_URL = "wss://eu2.rt.speechmatics.com/v2"

async def identify_speakers():
    handler_tasks: list[asyncio.Task] = []

    transcription_config = speechmatics.models.TranscriptionConfig(**{
            "language": LANGUAGE,
            "diarization": "speaker",
            "speaker_diarization_config": {
                # add your speaker identifiers
                "speakers": [
                    {"label": "Alice", "speaker_identifiers": ["<alice_id1>", "<alice_id2>"]},
                    {"label": "Bob", "speaker_identifiers": ["<bob_id1>"]},
                ]
            }
        }
    )
    # Create a transcription client
    client = speechmatics.client.WebsocketClient(
        speechmatics.models.ConnectionSettings(
            url=CONNECTION_URL,
            auth_token=API_KEY,
        )
    )
    # Optionally, add transcript handler
    client.add_event_handler(
        ServerMessageType.AddTranscript,
        lambda message: print(f"[transcript] {message['results']}"),
    )

    with open(PATH_TO_FILE, "rb") as fh:
        await asyncio.create_task(client.run(fh, transcription_config))

    for task in handler_tasks:
        await task


if __name__ == "__main__":
    asyncio.run(identify_speakers())