import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY", appId: "my-app" });

const { job } = await client.getJob("JOB_ID");
console.log(job.status);
