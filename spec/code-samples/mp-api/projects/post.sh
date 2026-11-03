MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"

curl -L -X POST "https://mp.speechmatics.com/v1/projects" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Customer support", "description": "Transcribes support calls"}'
