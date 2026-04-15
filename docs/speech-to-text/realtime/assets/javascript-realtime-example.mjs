import { spawn } from "node:child_process";
import { createSpeechmaticsJWT } from "@speechmatics/auth";
import { RealtimeClient } from "@speechmatics/real-time-client";

const apiKey = YOUR_API_KEY;
const client = new RealtimeClient();

const audio_format = {
    type: "raw",
    encoding: "pcm_s16le",
    sample_rate: 44100,
};

async function transcribe() {
    client.addEventListener("receiveMessage", ({ data }) => {
        if (data.message === "AddTranscript") {
            const transcript = data.metadata?.transcript;
            if (transcript) console.log(`[Final]: ${transcript}`);
        } else if (data.message === "Error") {
            console.error(`Error [${data.type}]: ${data.reason}`);
            process.exit(1);
        }
    });

    const jwt = await createSpeechmaticsJWT({ type: "rt", apiKey, ttl: 60 });

    await client.start(jwt, {
        transcription_config: {
            language: "en",
            max_delay: 0.7
        },
        audio_format,
    });

    const recorder = spawn("sox", [
        "-d",                                   // default audio device (mic)
        "-q",                                   // quiet
        "-r", String(audio_format.sample_rate), // sample rate
        "-e", "signed-integer",                 // match pcm_s16le
        "-b", "16",                             // match pcm_s16le
        "-c", "1",                              // mono
        "-t", "raw",                            // raw PCM output
        "-",                                    // pipe to stdout
    ]);

    recorder.stdout.on("data", (chunk) => client.sendAudio(chunk));
    recorder.stderr.on("data", (d) => console.error(`sox: ${d}`));

    process.on("SIGINT", () => {
        recorder.kill();
        client.stopRecognition({ noTimeout: true });
    });
}

transcribe().catch((err) => {
    console.error(err);
    process.exit(1);
});
