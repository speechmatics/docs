from speechmatics.voice import AdditionalVocabEntry, VoiceAgentConfig

config = VoiceAgentConfig(
    language="en",
    additional_vocab=[
        AdditionalVocabEntry(
            content="Speechmatics",
            sounds_like=["speech matters", "speech matics"]
        ),
        AdditionalVocabEntry(content="API"),
    ]
)
