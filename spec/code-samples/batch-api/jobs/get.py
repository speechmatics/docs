from speechmatics.batch import Client

with Client(api_key="YOUR_API_KEY") as client:
    for job in client.list_jobs(limit=10):
        print(job.id, job.status)
