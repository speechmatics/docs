from livekit.agents import AgentSession
from livekit.plugins import silero, speechmatics
from livekit.plugins.speechmatics import (
    AdditionalVocabEntry,
    TurnDetectionMode,
)

# Shared between the session and the plugin so only one model is loaded
vad = silero.VAD.load()

stt = speechmatics.STT(
    # Transcription
    language="en",
    output_locale="en-US",
    include_partials=True,

    # Turn detection: the VAD above closes each turn
    turn_detection_mode=TurnDetectionMode.EXTERNAL,
    vad=vad,

    # Diarization
    enable_diarization=True,
    speaker_sensitivity=0.6,
    max_speakers=4,
    prefer_current_speaker=True,

    # Renders each segment as <S1>Good morning.</S1>
    speaker_format="<{speaker_id}>{text}</{speaker_id}>",

    # Custom vocabulary
    additional_vocab=[
        AdditionalVocabEntry(content="Speechmatics"),
        AdditionalVocabEntry(content="LiveKit", sounds_like=["live kit"]),
    ],
)

session = AgentSession(
    stt=stt,
    vad=vad,
    # ... llm, tts, etc.
)
