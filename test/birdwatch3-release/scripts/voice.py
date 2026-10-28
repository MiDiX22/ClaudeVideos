"""Generates the Catalan voice-over with Microsoft Edge neural TTS (edge-tts).

One mp3 per scene goes to public/voice/, and src/voice.json gets each clip's
length and word timings so scenes can sync their animations to the words.

    pip install edge-tts
    python3 scripts/voice.py
"""

import asyncio
import json
import os
import ssl
import subprocess
from pathlib import Path

import edge_tts
import edge_tts.communicate

VOICE = "ca-ES-JoanaNeural"
RATE = "+10%"
ROOT = Path(__file__).resolve().parent.parent

# Behind a TLS-inspecting proxy, trust the CA bundle it names.
if os.environ.get("SSL_CERT_FILE"):
    edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])


async def synth(text: str, out: Path) -> list[dict]:
    words = []
    with out.open("wb") as f:
        async for chunk in edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary").stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                # Offsets come in 100-ns units.
                start = chunk["offset"] / 1e7
                words.append({"word": chunk["text"], "start": round(start, 3), "end": round(start + chunk["duration"] / 1e7, 3)})
    return words


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return round(float(out.stdout), 3)


async def main() -> None:
    script = json.loads((ROOT / "scripts/voice-script.json").read_text())
    (ROOT / "public/voice").mkdir(parents=True, exist_ok=True)
    clips = []
    for line in script:
        out = ROOT / f"public/voice/{line['id']}.mp3"
        words = await synth(line["text"], out)
        clips.append({"id": line["id"], "file": f"voice/{line['id']}.mp3", "duration": duration(out), "words": words})
        print(f"{line['id']}: {clips[-1]['duration']}s")
    (ROOT / "src/voice.json").write_text(json.dumps(clips, ensure_ascii=False, indent=1) + "\n")


asyncio.run(main())
