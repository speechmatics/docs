# $JOB_ID is from the submit command output
curl -L -X GET "https://asr.api.speechmatics.com/v2/jobs/$JOB_ID" \
-H "Authorization: Bearer $API_KEY"
