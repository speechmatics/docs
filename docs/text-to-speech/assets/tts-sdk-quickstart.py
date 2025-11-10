# pip install speechmatics-tts

import asyncio

from speechmatics.tts import AsyncClient, Voice, OutputFormat

# Generate speech data from text and save to WAV file
async def main():
    async with AsyncClient() as client:
        async with await client.generate(
            text="Welcome to the future of audio generation from text!",
            voice=Voice.SARAH,
            output_format=OutputFormat.WAV_16000
        ) as response:
            audio = b''.join([chunk async for chunk in response.content.iter_chunked(1024)])
            with open("output.wav", "wb") as wav:
                wav.write(audio)


# Run the async main function
if __name__ == "__main__":
    asyncio.run(main())
