from speechmatics.voice import (
    EndOfUtteranceMode,
    SmartTurnConfig,
    VoiceAgentConfig,
    VoiceAgentConfigPreset,
)

# ADAPTIVE mode + ML-enhanced turn detection
config = VoiceAgentConfig(
    end_of_utterance_mode=EndOfUtteranceMode.ADAPTIVE,
    smart_turn_config=SmartTurnConfig(enabled=True),
)

# Or use the SMART_TURN preset which bundles this configuration
config = VoiceAgentConfigPreset.SMART_TURN()
