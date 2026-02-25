from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import openai, silero, speechmatics
from livekit.plugins.speechmatics import TurnDetectionMode

load_dotenv(".env.local")


class VoiceAssistant(Agent):
    def __init__(self):
        super().__init__(
            instructions="You are a helpful voice assistant. Be concise and friendly."
        )


async def entrypoint(ctx: agents.JobContext):
    await ctx.connect()

    # Speech-to-Text: Speechmatics
    stt = speechmatics.STT(
        turn_detection_mode=TurnDetectionMode.SMART_TURN,
    )

    # Language Model: OpenAI
    llm = openai.LLM(model="gpt-4o-mini")

    # Text-to-Speech: Speechmatics
    tts = speechmatics.TTS()

    # Voice Activity Detection: Silero
    vad = silero.VAD.load()

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
