# Birdwatch 3 — vídeo de release

Vídeo en català (1:51) amb motion graphics i tipografia cinètica que explica les versions 3.0.0 (Alpha) i 3.0.1 (Beta) de Birdwatch 3, amb els colors del sistema Quercus BirdWatch.

## Ordres

```bash
npm i --loglevel=error
npm run dev      # Remotion Studio
npm run render   # out/birdwatch3-release.mp4
```

## Veu en off

El guió és a `scripts/voice-script.json`. La veu es genera amb la veu neural `ca-ES-JoanaNeural` (edge-tts):

```bash
pip install edge-tts
python3 scripts/voice.py
```

Escriu un mp3 per escena a `public/voice/` i `src/voice.json` amb la durada i el temps de cada paraula. Cada escena dura el que dura la seva locució i les animacions se sincronitzen amb les paraules (`useWordFrame`), així que si canvies el guió el vídeo s'hi adapta sol.

## Àudio

- `public/music/mixkit-its-love-834.mp3`: "It's Love" de Mixkit (Mixkit License).
- `public/sfx/`: efectes de https://remotion.media.
