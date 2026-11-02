from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import openai, silero, speechmatics

load_dotenv(".env.local")


class VoiceAssistant(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are a helpful voice assistant. Be concise and friendly."
        )


async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()

    # Voice Activity Detection: Silero, shared with the STT plugin below
    vad = silero.VAD.load()

    # Speech to Text: Speechmatics agent STT. The VAD closes each turn.
    stt = speechmatics.STT(vad=vad)

    # Language Model: OpenAI
    llm = openai.LLM(model="gpt-4o-mini")

    # Text to Speech: Speechmatics
    tts = speechmatics.TTS()

    # Create and start session
    session = AgentSession(
        stt=stt,
        llm=llm,
        tts=tts,
        vad=vad,
    )

    await session.start(
        room=ctx.room,
        agent=VoiceAssistant(),
        room_input_options=RoomInputOptions(),
    )

    await session.generate_reply(
        instructions="Say a short hello and ask how you can help."
    )


if __name__ == "__main__":
    agents.cli.run_app(
        agents.WorkerOptions(entrypoint_fnc=entrypoint),
    )
