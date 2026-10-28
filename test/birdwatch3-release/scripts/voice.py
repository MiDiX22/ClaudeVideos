"""Generates the voice-over with Microsoft Edge neural TTS (edge-tts).

The script for each language is scripts/voice-script.<lang>.json. A `{key}` marker
before a word names a cue: the moment that word is spoken, which scenes use to
time their animations. One mp3 per scene goes to public/voice/<lang>/, and
src/voice/<lang>.json gets each clip's length, word timings and cues.

    pip install edge-tts
    python3 scripts/voice.py ca en
"""

import asyncio
import json
import os
import re
import ssl
import subprocess
import sys
from pathlib import Path

import edge_tts
import edge_tts.communicate

ROOT = Path(__file__).resolve().parent.parent
MARKER = re.compile(r"\{(\w+)\}")

# Behind a TLS-inspecting proxy, trust the CA bundle it names.
if os.environ.get("SSL_CERT_FILE"):
    edge_tts.communicate._SSL_CTX = ssl.create_default_context(cafile=os.environ["SSL_CERT_FILE"])


def parse(text: str) -> tuple[str, dict[str, int]]:
    """Strips the markers, returning the plain text and each cue's character offset in it."""
    plain, cues, last = "", {}, 0
    for m in MARKER.finditer(text):
        plain += text[last : m.start()]
        cues[m.group(1)] = len(plain)
        last = m.end()
    return plain + text[last:], cues


async def synth(text: str, voice: str, rate: str, out: Path) -> list[dict]:
    words = []
    with out.open("wb") as f:
        async for chunk in edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary").stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                # Offsets come in 100-ns units.
                start = chunk["offset"] / 1e7
                words.append({"word": chunk["text"], "start": round(start, 3), "end": round(start + chunk["duration"] / 1e7, 3)})
    return words


def locate(plain: str, words: list[dict]) -> list[int]:
    """Character offset of each spoken word in the plain text."""
    offsets, cursor = [], 0
    for w in words:
        i = plain.find(w["word"], cursor)
        if i < 0:
            raise ValueError(f"Cannot find {w['word']!r} after offset {cursor} in {plain!r}")
        offsets.append(i)
        cursor = i + len(w["word"])
    return offsets


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return round(float(out.stdout), 3)


async def build(lang: str) -> None:
    script = json.loads((ROOT / f"scripts/voice-script.{lang}.json").read_text())
    (ROOT / f"public/voice/{lang}").mkdir(parents=True, exist_ok=True)
    clips = []
    for line in script["clips"]:
        plain, markers = parse(line["text"])
        out = ROOT / f"public/voice/{lang}/{line['id']}.mp3"
        words = await synth(plain, script["voice"], script["rate"], out)
        offsets = locate(plain, words)
        cues = {}
        for key, at in markers.items():
            index = next(i for i, o in enumerate(offsets) if o >= at)
            cues[key] = words[index]["start"]
        clips.append({"id": line["id"], "file": f"voice/{lang}/{line['id']}.mp3", "duration": duration(out), "cues": cues, "words": words})
        print(f"{lang} {line['id']}: {clips[-1]['duration']}s")
    (ROOT / f"src/voice/{lang}.json").write_text(json.dumps(clips, ensure_ascii=False, indent=1) + "\n")


async def main() -> None:
    for lang in sys.argv[1:] or ["ca", "en"]:
        await build(lang)


asyncio.run(main())
