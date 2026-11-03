API_KEY="YOUR_API_KEY"

curl -L -X GET "https://eu1.asr.api.speechmatics.com/v2/jobs?limit=10" \
  -H "Authorization: Bearer ${API_KEY}"
