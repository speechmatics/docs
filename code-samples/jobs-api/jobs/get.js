import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY" });

const response = await client.listJobs();
const json = await response.json();
console.log(json);
