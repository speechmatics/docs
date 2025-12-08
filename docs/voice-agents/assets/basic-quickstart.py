import asyncio
import os
from speechmatics.rt import Microphone
from speechmatics.voice import VoiceAgentClient, AgentServerMessageType

async def main():
    # Create client with preset
    client = VoiceAgentClient(
        api_key=os.getenv("SPEECHMATICS_API_KEY"),
        preset="scribe"
    )

    # Handle final segments
    @client.on(AgentServerMessageType.ADD_SEGMENT)
    def on_segment(message):
        for segment in message["segments"]:
            speaker = segment["speaker_id"]
            text = segment["text"]
            print(f"{speaker}: {text}")

    # Setup microphone
    mic = Microphone(sample_rate=16000, chunk_size=320)
    if not mic.start():
        print("Error: Microphone not available")
        return

    # Connect and stream
    await client.connect()

    try:
        while True:
            audio_chunk = await mic.read(320)
            await client.send_audio(audio_chunk)
    except KeyboardInterrupt:
        pass
    finally:
        await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())