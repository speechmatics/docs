MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"
PROJECT_ID="12345"

curl -L -X GET "https://mp.speechmatics.com/v1/projects/${PROJECT_ID}" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}"
