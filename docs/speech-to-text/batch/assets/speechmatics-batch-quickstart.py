import asyncio
from speechmatics.batch import AsyncClient, TranscriptionConfig

API_KEY = "YOUR_API_KEY"
AUDIO_FILE= "example.wav"

config = TranscriptionConfig(
    diarization="speaker"
)

async def main():
    client = AsyncClient(api_key=API_KEY)
    result = await client.transcribe(
        audio_file=AUDIO_FILE, 
        transcription_config=config
    )
    print(result.transcript_text)
    await client.close()

asyncio.run(main())
