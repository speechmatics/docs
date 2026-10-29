MANAGEMENT_TOKEN="YOUR_MANAGEMENT_TOKEN"
APIKEY_ID="APIKEY_ID"

curl -L -X DELETE "https://mp.speechmatics.com/v1/api-keys/${APIKEY_ID}" \
  -H "Authorization: Bearer ${MANAGEMENT_TOKEN}"
