from speechmatics.voice import VoiceAgentConfigPreset, VoiceAgentConfig

# Use preset with custom overrides
config = VoiceAgentConfigPreset.SCRIBE(
    VoiceAgentConfig(
        language="es",
        max_delay=0.8
    )
)
