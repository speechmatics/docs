import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY", appId: "my-app" });

const transcript = await client.getJobResult("JOB_ID", "text");
console.log(transcript);
