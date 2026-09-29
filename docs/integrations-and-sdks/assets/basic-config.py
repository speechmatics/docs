from speechmatics.voice import (
    AdditionalVocabEntry,
    AudioEncoding,
    OperatingPoint,
    VoiceAgentConfig,
    VoiceAgentConfigPreset,
)

overrides = VoiceAgentConfig(
    # Language and locale
    language="en",  # e.g. "en", "es", "fr"
    output_locale=None,  # e.g. "en-GB", "en-US"

    # Model selection
    operating_point=OperatingPoint.ENHANCED,  # STANDARD or ENHANCED
    domain=None,  # e.g. "finance", "medical"

    # Vocabulary
    additional_vocab=[
        AdditionalVocabEntry(
            content="Speechmatics",
            sounds_like=["speech matters", "speech matics"],
        ),
        AdditionalVocabEntry(content="API"),
    ],
    punctuation_overrides=None,

    # Audio
    sample_rate=16000,
    audio_encoding=AudioEncoding.PCM_S16LE,

    # Diarization
    enable_diarization=True,
)

config = VoiceAgentConfigPreset.ADAPTIVE(overrides)
