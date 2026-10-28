from speechmatics.batch import Client

with Client(api_key="YOUR_API_KEY") as client:
    job = client.get_job_info("JOB_ID")
    print(job.status)
