API_KEY="YOUR_API_KEY"
PATH_TO_FILE="example.wav"

curl -L -X POST "https://asr.api.speechmatics.com/v2/jobs/" \
-H "Authorization: Bearer ${API_KEY}" \
-F data_file=@${PATH_TO_FILE} \
-F config='{"type": "transcription","transcription_config": { "operating_point":"enhanced", "language": "en" }}'
