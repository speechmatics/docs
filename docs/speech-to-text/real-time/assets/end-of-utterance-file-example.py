import speechmatics

API_KEY = "YOUR_API_KEY"
PATH_TO_FILE = "example.wav"
LANGUAGE = "en"
CONNECTION_URL = "wss://eu2.rt.speechmatics.com/v2"

# Create a transcription client
ws = speechmatics.client.WebsocketClient(
    speechmatics.models.ConnectionSettings(
        url=CONNECTION_URL,
        auth_token=API_KEY,
    )
)


# Define an event handler to print the partial transcript
def print_partial_transcript(msg):
    print(f"[partial] {msg['metadata']['transcript']}")


# Define an event handler to print the full transcript
def print_transcript(msg):
    print(f"[   FULL] {msg['metadata']['transcript']}")


# Define an event handler for the end-of-utterance event
def print_eou(msg):
    print("EndOfUtterance")


# Register the event handler for partial transcript
ws.add_event_handler(
    event_name=speechmatics.models.ServerMessageType.AddPartialTranscript,
    event_handler=print_partial_transcript,
)

# Register the event handler for full transcript
ws.add_event_handler(
    event_name=speechmatics.models.ServerMessageType.AddTranscript,
    event_handler=print_transcript,
)

# Register the event handler for end of utterance
ws.add_event_handler(
    event_name=speechmatics.models.ServerMessageType.EndOfUtterance,
    event_handler=print_eou,
)

settings = speechmatics.models.AudioSettings()

# Define transcription parameters
# Full list of parameters described here: https://speechmatics.github.io/speechmatics-python/models

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

print("Starting transcription (type Ctrl-C to stop):")
with open(PATH_TO_FILE, "rb") as fd:
    try:
        ws.run_synchronously(fd, conf, settings)
    except KeyboardInterrupt:
        print("\nTranscription stopped.")
