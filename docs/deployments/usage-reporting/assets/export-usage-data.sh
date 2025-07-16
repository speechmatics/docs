#!/bin/bash

# Use ISO-8601 format
START="2021-11-01T00:00:00Z"
END="2021-12-01T00:00:00Z"
CHUNK="7 day"

d=$(date -d "$START" -I)
while [ $(date -d "$d" +%s) -le $(date -d "$END" +"%s") ]; do
    SINCE=$(date -d "$d" +"%Y-%m-%dT%H:%M:%SZ")
    d=$(date -I -d "$d + $CHUNK")
    UNTIL=$(date -d "$d" +"%Y-%m-%dT%H:%M:%SZ")
    
    curl "asr-usage.net:8000/v1/export?since=${SINCE}&until=${UNTIL}" > exported_$(date -d "${SINCE}" -I)_$(date -d "${UNTIL}" -I).json.gz
done