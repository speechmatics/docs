from livekit.agents import AgentSession
from livekit.plugins import speechmatics
from livekit.plugins.speechmatics import (
    AdditionalVocabEntry,
    AudioEncoding,
    OperatingPoint,
    SpeakerFocusMode,
    SpeakerIdentifier,
    TurnDetectionMode,
)

stt = speechmatics.STT(
    # Service options
    language="en",
    output_locale="en-US",
    operating_point=OperatingPoint.ENHANCED,

    # Turn detection
    turn_detection_mode=TurnDetectionMode.ADAPTIVE,
    max_delay=1.5,
    include_partials=True,

    # Diarization
    enable_diarization=True,
    speaker_sensitivity=0.6,
    max_speakers=4,
    prefer_current_speaker=True,

    # Speaker focus
    focus_speakers=["S1", "S2"],
    focus_mode=SpeakerFocusMode.RETAIN,
    ignore_speakers=["__ASSISTANT__"],

    # Output formatting
    speaker_active_format="[{speaker_id}]: {text}",
    speaker_passive_format="[{speaker_id} (background)]: {text}",

    # Custom vocabulary
    additional_vocab=[
        AdditionalVocabEntry(content="Speechmatics"),
        AdditionalVocabEntry(content="LiveKit", sounds_like=["live kit", "livekit"]),
    ],
)

session = AgentSession(
    stt=stt,
    # ... llm, tts, vad, etc.
)
