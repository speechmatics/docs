API_KEY="YOUR_API_KEY"

curl -L -X POST "https://eu1.asr.api.speechmatics.com/v2/jobs" \
  -H "Authorization: Bearer ${API_KEY}" \
  -F data_file=@example.wav \
  -F config='{"type": "transcription", "transcription_config": {"language": "en", "model": "enhanced"}}'
