MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"

curl -L -X POST "https://mp.speechmatics.com/v1/api-keys?type=batch" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"project_id": 12345, "name": "ci-pipeline"}'
