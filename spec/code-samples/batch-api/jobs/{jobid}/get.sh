API_KEY="YOUR_API_KEY"
JOB_ID="JOB_ID"

curl -L -X GET "https://eu1.asr.api.speechmatics.com/v2/jobs/${JOB_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
