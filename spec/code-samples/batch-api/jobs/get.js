import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY", appId: "my-app" });

const { jobs } = await client.listJobs({ limit: 10 });
for (const job of jobs) {
  console.log(job.id, job.status);
}
