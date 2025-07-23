import https from "node:https";
import { createSpeechmaticsJWT } from "@speechmatics/auth";
import { RealtimeClient } from "@speechmatics/real-time-client";

const apiKey = YOUR_API_KEY;
const client = new RealtimeClient();
const streamURL = "https://media-ice.musicradio.com/LBCUKMP3";

async function transcribe() {
  // Print transcript as we receive it
  client.addEventListener("receiveMessage", ({ data }) => {
    if (data.message === "AddTranscript") {
      for (const result of data.results) {
        if (result.type === "word") {
          process.stdout.write(" ");
        }
        process.stdout.write(`${result.alternatives?.[0].content}`);
        if (result.is_eos) {
          process.stdout.write("\n");
        }
      }
    } else if (data.message === "EndOfTranscript") {
      process.stdout.write("\n");
      process.exit(0);
    } else if (data.message === "Error") {
      process.stdout.write(`\n${JSON.stringify(data)}\n`);
      process.exit(1);
    }
  });

  const jwt = await createSpeechmaticsJWT({
    type: "rt",
    apiKey,
    ttl: 60, // 1 minute
  });

  await client.start(jwt, {
    transcription_config: {
      language: "en",
      operating_point: "enhanced",
      max_delay: 1.0,
      transcript_filtering_config: {
        remove_disfluencies: true,
      },
    },
  });

  const stream = https.get(streamURL, (response) => {
    // Handle the response stream
    response.on("data", (chunk) => {
      client.sendAudio(chunk);
    });

    response.on("end", () => {
      console.log("Stream ended");
      client.stopRecognition({ noTimeout: true });
    });

    response.on("error", (error) => {
      console.error("Stream error:", error);
      client.stopRecognition();
    });
  });

  stream.on("error", (error) => {
    console.error("Request error:", error);
    client.stopRecognition();
  });
}

transcribe();
