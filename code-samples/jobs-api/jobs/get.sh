API_KEY="YOUR_API_KEY"

curl -L -X GET "https://asr.api.speechmatics.com/v2/jobs/" \
-H "Authorization: Bearer ${API_KEY}"