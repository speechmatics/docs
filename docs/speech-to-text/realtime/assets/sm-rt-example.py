import asyncio
from speechmatics.rt import (
    AudioEncoding, AudioFormat, AuthenticationError,
    Microphone, ServerMessageType, TranscriptResult,
    TranscriptionConfig, AsyncClient,
)

API_KEY = YOUR_API_KEY

# Set up config and format for transcription
audio_format = AudioFormat(
    encoding=AudioEncoding.PCM_S16LE, 
    sample_rate=16000, 
    chunk_size=4096,
)
config = TranscriptionConfig(
    language="en", 
    max_delay=0.7,
)

async def main():

    # Set up microphone
    mic = Microphone(
        sample_rate=audio_format.sample_rate, 
        chunk_size=audio_format.chunk_size
    )
    if not mic.start():
        print("Mic not started — please install PyAudio")

    try:
        async with AsyncClient(api_key=API_KEY) as client:
            # Handle ADD_TRANSCRIPT message
            @client.on(ServerMessageType.ADD_TRANSCRIPT)
            def handle_finals(msg):
                if final := TranscriptResult.from_message(msg).metadata.transcript:
                    print(f"[Final]: {final}")

            try:
                # Begin transcribing
                await client.start_session(
                    transcription_config=config, 
                    audio_format=audio_format
                )
                while True:
                    await client.send_audio(
                        await mic.read(
                            chunk_size=audio_format.chunk_size
                        )
                    )
            except KeyboardInterrupt:
                pass
            finally:
                mic.stop()

    except AuthenticationError as e:
        print(f"Auth error: {e}")

if __name__ == "__main__":
    asyncio.run(main())