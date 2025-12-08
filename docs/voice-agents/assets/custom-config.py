from speechmatics.voice import VoiceAgentClient, VoiceAgentConfig, EndOfUtteranceMode

config = VoiceAgentConfig(
    language="en",
    enable_diarization=True,
    max_delay=0.7,
    end_of_utterance_mode=EndOfUtteranceMode.ADAPTIVE,
)

client = VoiceAgentClient(api_key=api_key, config=config)