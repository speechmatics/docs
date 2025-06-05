from speechmatics.batch_client import BatchClient

# Open the client using a context manager
with BatchClient("YOUR_API_KEY") as client:
    job_id = client.submit_job(
        audio="PATH_TO_FILE",
    )
    print(job_id)
