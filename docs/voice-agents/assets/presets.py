# Presets provide optimized configurations for common use cases: 

# External end of turn preset - endpointing handled by the client
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="external")

# Scribe preset - for note-taking
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="scribe")

# Low latency preset - for fast responses
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="low_latency")

# Conversation preset - for natural dialogue
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="conversation_adaptive")

# Advanced conversation with ML turn detection
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="conversation_smart_turn")

# Captions preset - for live captioning
client = VoiceAgentClient(api_key=os.getenv("YOUR_API_KEY"), preset="captions")
