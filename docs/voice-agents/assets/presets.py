# Presets provide optimized configurations for common use cases: 

# External end of turn preset - endpointing handled by the client
client = VoiceAgentClient(api_key=api_key, preset="external")

# Scribe preset - for note-taking
client = VoiceAgentClient(api_key=api_key, preset="scribe")

# Low latency preset - for fast responses
client = VoiceAgentClient(api_key=api_key, preset="low_latency")

# Conversation preset - for natural dialogue
client = VoiceAgentClient(api_key=api_key, preset="conversation_adaptive")

# Advanced conversation with ML turn detection
client = VoiceAgentClient(api_key=api_key, preset="conversation_smart_turn")

# Captions preset - for live captioning
client = VoiceAgentClient(api_key=api_key, preset="captions")