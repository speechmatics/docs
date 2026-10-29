MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"
PROJECT_ID="12345"

curl -L -X PUT "https://mp.speechmatics.com/v1/projects/${PROJECT_ID}" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Customer support (EU)"}'
