from speechmatics.batch import Client

with Client(api_key="YOUR_API_KEY") as client:
    transcript = client.get_transcript("JOB_ID")
    print(transcript.transcript_text)
