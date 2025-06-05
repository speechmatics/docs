import { BatchClient } from "@speechmatics/batch-client";

const client = new BatchClient({ apiKey: "YOUR_API_KEY" });

// This is to get a File handle in NodeJS
// In the browser, you can pass a File object from a form input, or similar
const blob = await openAsBlob("PATH_TO_FILE");
const file = new File([blob], "your_filename");

const response = await client.createTranscriptionJob({
  file,
  config: {
    type: "transcription",
    transcription_config: {
      operating_point: "enhanced",
      language: "en",
    },
  },
});

const json = await response.json();
console.log(json);
