from speechmatics.batch import Client

with Client(api_key="YOUR_API_KEY") as client:
    client.delete_job("JOB_ID")
