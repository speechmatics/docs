@client.on(AgentServerMessageType.ADD_SEGMENT)
def on_final_segment(message):
    for segment in message["segments"]:
        print(f"[FINAL] {segment['speaker_id']}: {segment['text']}")

@client.on(AgentServerMessageType.ADD_PARTIAL_SEGMENT)
def on_partial_segment(message):
    for segment in message["segments"]:
        print(f"[PARTIAL] {segment['speaker_id']}: {segment['text']}")
