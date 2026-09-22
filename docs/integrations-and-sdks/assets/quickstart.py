import asyncio
import os
from speechmatics.rt import Microphone
from speechmatics.voice import VoiceAgentClient, AgentServerMessageType

async def main():
    """Stream microphone audio to Speechmatics Voice Agent using 'scribe' preset"""

    # Audio configuration
    SAMPLE_RATE = 16000         # Hz
    CHUNK_SIZE = 160            # Samples per read
    PRESET = "scribe"           # Configuration preset

    # Create client with preset
    client = VoiceAgentClient(
        api_key=os.getenv("SPEECHMATICS_API_KEY"),
        preset=PRESET
    )

    # Print finalised segments of speech with speaker ID
    @client.on(AgentServerMessageType.ADD_SEGMENT)
    def on_segment(message):
        for segment in message["segments"]:
            speaker = segment["speaker_id"]
            text = segment["text"]
            print(f"{speaker}: {text}")

    # Setup microphone
    mic = Microphone(SAMPLE_RATE, CHUNK_SIZE)
    if not mic.start():
        print("Error: Microphone not available")
        return

    # Connect to the Voice Agent
    await client.connect()

    # Stream microphone audio (interruptible using keyboard)
    try:
        while True:
            audio_chunk = await mic.read(CHUNK_SIZE)
            if not audio_chunk:
                break  # Microphone stopped producing data
            await client.send_audio(audio_chunk)
    except KeyboardInterrupt:
        pass
    finally:
        await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
