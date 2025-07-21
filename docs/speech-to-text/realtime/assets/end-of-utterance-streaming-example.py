import speechmatics
import pyaudio
import threading
import time
import asyncio

API_KEY = "YOUR_API_KEY"
LANGUAGE = "en"
CONNECTION_URL = f"wss://eu2.rt.speechmatics.com/v2"

# Audio recording parameters
SAMPLE_RATE = 16000
CHUNK_SIZE = 1024
FORMAT = pyaudio.paFloat32


class AudioProcessor:
    def __init__(self):
        self.wave_data = bytearray()
        self.read_offset = 0

    async def read(self, chunk_size):
        while self.read_offset + chunk_size > len(self.wave_data):
            await asyncio.sleep(0.001)

        new_offset = self.read_offset + chunk_size
        data = self.wave_data[self.read_offset : new_offset]
        self.read_offset = new_offset
        return data

    def write_audio(self, data):
        self.wave_data.extend(data)


class VoiceAITranscriber:
    def __init__(self):
        self.ws = speechmatics.client.WebsocketClient(
            speechmatics.models.ConnectionSettings(
                url=CONNECTION_URL,
                auth_token=API_KEY,
            )
        )
        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.is_recording = False
        self.audio_processor = AudioProcessor()

        # Set up event handlers
        self.ws.add_event_handler(
            event_name=speechmatics.models.ServerMessageType.AddPartialTranscript,
            event_handler=self.handle_partial_transcript,
        )

        self.ws.add_event_handler(
            event_name=speechmatics.models.ServerMessageType.AddTranscript,
            event_handler=self.handle_final_transcript,
        )

        self.ws.add_event_handler(
            event_name=speechmatics.models.ServerMessageType.EndOfUtterance,
            event_handler=self.handle_end_of_utterance,
        )

    def handle_partial_transcript(self, msg):
        transcript = msg["metadata"]["transcript"]
        print(f"[Listening...] {transcript}")

    def handle_final_transcript(self, msg):
        transcript = msg["metadata"]["transcript"]
        print(f"[Complete] {transcript}")

    def handle_end_of_utterance(self, msg):
        print("🔚 End of utterance detected - ready for AI response!")
        # This is where your voice AI would process the complete utterance
        # and generate a response

    def stream_callback(self, in_data, frame_count, time_info, status):
        self.audio_processor.write_audio(in_data)
        return in_data, pyaudio.paContinue

    def start_streaming(self):
        try:
            # Set up pyaudio stream with callback
            self.stream = self.audio.open(
                format=FORMAT,
                channels=1,
                rate=SAMPLE_RATE,
                input=True,
                frames_per_buffer=CHUNK_SIZE,
                stream_callback=self.stream_callback,
            )

            # Configure audio settings
            settings = speechmatics.models.AudioSettings()
            settings.encoding = "pcm_f32le"
            settings.sample_rate = SAMPLE_RATE
            settings.chunk_size = CHUNK_SIZE

            # Configure transcription with end-of-utterance detection

            conversation_config = speechmatics.models.ConversationConfig(
                end_of_utterance_silence_trigger=0.75
            )  # Adjust as needed

            conf = speechmatics.models.TranscriptionConfig(
                operating_point="enhanced",
                language=LANGUAGE,
                enable_partials=True,
                max_delay=1,
                conversation_config=conversation_config,
            )

            print("🎤 Voice AI ready - start speaking!")
            print("Press Ctrl+C to stop...")

            # Start transcription using the working approach
            self.ws.run_synchronously(
                transcription_config=conf,
                stream=self.audio_processor,
                audio_settings=settings,
            )

        except KeyboardInterrupt:
            print("\n🛑 Stopping voice AI transcriber...")
        except Exception as e:
            print(f"Error in transcription: {e}")
        finally:
            self.stop_streaming()

    def stop_streaming(self):
        self.is_recording = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()
        self.audio.terminate()


# Usage
if __name__ == "__main__":
    transcriber = VoiceAITranscriber()
    transcriber.start_streaming()
