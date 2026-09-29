@client.on(AgentServerMessageType.ADD_SEGMENT)
def on_segment(message):
    for segment in message["segments"]:
        if segment["is_active"]:
            process_focused_speaker(segment["text"])
        else:
            process_passive_speaker(segment["speaker_id"], segment["text"])
