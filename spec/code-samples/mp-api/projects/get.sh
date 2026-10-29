MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"

curl -L -X GET "https://mp.speechmatics.com/v1/projects" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}"
