from speechmatics.voice import (
    EndOfUtteranceMode,
    SpeakerFocusConfig,
    SpeakerFocusMode,
    SpeakerIdentifier,
    VoiceAgentConfig,
    VoiceAgentConfigPreset,
)

overrides = VoiceAgentConfig(
    end_of_utterance_mode=EndOfUtteranceMode.ADAPTIVE,
    enable_diarization=True,
    speaker_config=SpeakerFocusConfig(
        focus_speakers=["S1"],
        focus_mode=SpeakerFocusMode.RETAIN,
    ),
    known_speakers=[
        SpeakerIdentifier(label="Alice", speaker_identifiers=["XX...XX"]),
    ],
)

config = VoiceAgentConfigPreset.ADAPTIVE(overrides)
