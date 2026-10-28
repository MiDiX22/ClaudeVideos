# Birdwatch 3 — vídeo de release

Vídeo en català (1:51) i en anglès (1:35) amb motion graphics i tipografia cinètica que explica les versions 3.0.0 (Alpha) i 3.0.1 (Beta) de Birdwatch 3, amb els colors del sistema Quercus BirdWatch.

## Ordres

```bash
npm i --loglevel=error
npm run dev      # Remotion Studio
npm run render   # out/birdwatch3-release.mp4 i out/birdwatch3-release-en.mp4
```

## Idiomes i veu en off

Les composicions són `Birdwatch3` (català) i `Birdwatch3-EN` (anglès): el mateix codi, amb el text de pantalla de `src/copy.ts` i la veu de cada idioma.

Els guions són a `scripts/voice-script.ca.json` (veu `ca-ES-JoanaNeural`) i `scripts/voice-script.en.json` (veu `en-GB-SoniaNeural`). Una marca `{clau}` davant d'una paraula és un punt de sincronia: les escenes hi lliguen les animacions amb `useCue("…")("clau")`, així que cada guió ha de tenir les mateixes claus.

```bash
pip install edge-tts
python3 scripts/voice.py ca en
```

Escriu un mp3 per escena a `public/voice/<idioma>/` i `src/voice/<idioma>.json` amb la durada, el temps de cada paraula i els punts de sincronia. Cada escena dura el que dura la seva locució, així que si canvies el guió el vídeo s'hi adapta sol.

## Àudio

- `public/music/mixkit-its-love-834.mp3`: "It's Love" de Mixkit (Mixkit License).
- `public/sfx/`: efectes de https://remotion.media.
