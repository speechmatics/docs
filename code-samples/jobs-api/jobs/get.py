from speechmatics.batch_client import BatchClient

with BatchClient("YOUR_API_KEY") as client:
    jobs_list = client.list_jobs()

    # Here, we get and print out the name
    # of the first job if it exists
    if len(jobs_list):
        first_job_name = jobs_list["jobs"][0]["data_name"]
        print(first_job_name)
