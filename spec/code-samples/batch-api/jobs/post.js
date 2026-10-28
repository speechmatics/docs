import { openAsBlob } from "node:fs";
import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY", appId: "my-app" });

// In a browser, pass a File from a file input instead.
const file = new File([await openAsBlob("example.wav")], "example.wav");

const { id } = await client.createTranscriptionJob(file, {
  transcription_config: { language: "en", model: "enhanced" },
});
console.log(id);
