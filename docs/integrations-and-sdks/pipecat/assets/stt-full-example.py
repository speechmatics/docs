from pipecat.services.speechmatics.stt import SpeechmaticsSTTService

stt = SpeechmaticsSTTService(
    params=SpeechmaticsSTTService.InputParams(
        # Service options
        language="en",
        operating_point=SpeechmaticsSTTService.OperatingPoint.ENHANCED,

        # Turn detection
        turn_detection_mode=SpeechmaticsSTTService.TurnDetectionMode.EXTERNAL,
        max_delay=1.5,
        include_partials=True,

        # Diarization
        enable_diarization=True,
        speaker_sensitivity=0.6,
        max_speakers=4,
        prefer_current_speaker=True,

        # Speaker focus
        focus_speakers=["S1", "S2"],
        focus_mode=SpeechmaticsSTTService.SpeakerFocusMode.RETAIN,
        ignore_speakers=[],

        # Output formatting
        speaker_active_format="[{speaker_id}]: {text}",
        speaker_passive_format="[{speaker_id} (background)]: {text}",

        # Custom vocabulary
        additional_vocab=[
            SpeechmaticsSTTService.AdditionalVocabEntry(content="Speechmatics"),
            SpeechmaticsSTTService.AdditionalVocabEntry(content="Pipecat", sounds_like=["pipe cat"]),
        ],
    ),
)
