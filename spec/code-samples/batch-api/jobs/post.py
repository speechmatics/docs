from speechmatics.batch import Client, TranscriptionConfig

with Client(api_key="YOUR_API_KEY") as client:
    job = client.submit_job(
        "example.wav",
        transcription_config=TranscriptionConfig(language="en", model="enhanced"),
    )
    print(job.id)
