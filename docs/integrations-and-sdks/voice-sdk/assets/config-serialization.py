from speechmatics.voice import VoiceAgentConfigPreset, VoiceAgentConfig

# Export preset to JSON
config_json = VoiceAgentConfigPreset.SCRIBE().to_json()

# Load from JSON
config = VoiceAgentConfig.from_json(config_json)

# Or create from JSON string
config = VoiceAgentConfig.from_json('{"language": "en", "enable_diarization": true}')