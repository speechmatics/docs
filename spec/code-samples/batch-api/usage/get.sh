API_KEY="YOUR_API_KEY"

curl -L -X GET "https://eu1.asr.api.speechmatics.com/v2/usage?since=2026-10-01&until=2026-10-31" \
  -H "Authorization: Bearer ${API_KEY}"
