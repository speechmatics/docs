from speechmatics.models import ConnectionSettings
from speechmatics.batch_client import BatchClient
from httpx import HTTPStatusError

API_KEY = "YOUR_API_KEY"
PATH_TO_FILE = "example.wav"
LANGUAGE = "en"  # Transcription language

settings = ConnectionSettings(
    url="https://eu1.asr.api.speechmatics.com/v2",
    auth_token=API_KEY,
)

# Define transcription parameters
conf = {
    "type": "transcription",
    "transcription_config": {"language": LANGUAGE},
    # highlight-start
    # You can also configure the list of topics you wish to detect. See below for more detail.
    "topic_detection_config": {},
    # highlight-end
}

# Open the client using a context manager
with BatchClient(settings) as client:
    try:
        job_id = client.submit_job(
            audio=PATH_TO_FILE,
            transcription_config=conf,
        )
        print(f"job {job_id} submitted successfully, waiting for transcript")

        # Note that in production, you should set up notifications instead of polling.
        # Notifications are described here: https://docs.speechmatics.com/batch-transcription/notifications
        transcript = client.wait_for_completion(job_id, transcription_format="json-v2")
        # highlight-start
        topics_detected = transcript["topics"]
        topic_segments = topics_detected["segments"]
        topic_summary = topics_detected["summary"]["overall"]

        # print the overall count for each topic
        print(topic_summary)

        # print the text and the corresponding topic(s) and timings for each segment
        for segment in topic_segments:
            print(
                f"({segment['start_time']} - {segment['end_time']}): {segment['text']} ({[t['topic'] for t in segment['topics']]})"
            )
        # highlight-end
    except HTTPStatusError as e:
        if e.response.status_code == 401:
            print("Invalid API key - Check your API_KEY at the top of the code!")
        elif e.response.status_code == 400:
            print(e.response.json()["detail"])
        else:
            raise e
