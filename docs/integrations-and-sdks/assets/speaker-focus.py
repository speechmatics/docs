from speechmatics.voice import SpeakerFocusConfig, SpeakerFocusMode, VoiceAgentConfig

# Focus on specific speakers, keep others as passive
config = VoiceAgentConfig(
    enable_diarization=True,
    speaker_config=SpeakerFocusConfig(
        focus_speakers=["S1", "S2"],
        focus_mode=SpeakerFocusMode.RETAIN
    )
)

# Focus on specific speakers, exclude everyone else
config = VoiceAgentConfig(
    enable_diarization=True,
    speaker_config=SpeakerFocusConfig(
        focus_speakers=["S1", "S2"],
        focus_mode=SpeakerFocusMode.IGNORE
    )
)

# Blacklist specific speakers (exclude them from all processing)
config = VoiceAgentConfig(
    enable_diarization=True,
    speaker_config=SpeakerFocusConfig(
        ignore_speakers=["S3"],
    )
)
