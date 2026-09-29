from pipecat.services.speechmatics.stt import SpeechmaticsSTTService
from pipecat.transcriptions.language import Language

stt = SpeechmaticsSTTService(
    settings=SpeechmaticsSTTService.Settings(
        # Transcription
        language=Language.EN,
        enable_partials=True,

        # Turn detection: a Pipecat VAD closes each turn
        turn_detection_mode=SpeechmaticsSTTService.TurnDetectionMode.EXTERNAL,

        # Diarization
        enable_diarization=True,
        speaker_sensitivity=0.6,
        max_speakers=4,
        prefer_current_speaker=True,

        # Renders each segment as <S1>Good morning.</S1>
        speaker_active_format="<{speaker_id}>{text}</{speaker_id}>",

        # Custom vocabulary
        additional_vocab=[
            SpeechmaticsSTTService.AdditionalVocabEntry(content="Speechmatics"),
            SpeechmaticsSTTService.AdditionalVocabEntry(
                content="Pipecat", sounds_like=["pipe cat"]
            ),
        ],
    ),
)
