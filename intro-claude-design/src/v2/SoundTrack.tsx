import { Audio } from "@remotion/media";
import { interpolate, Sequence, staticFile } from "remotion";

type Sfx = { at: number; file: string; volume: number };

// The voice-over ends after "…de confiança"; the take continues with an extra "Gràcies".
const VOICE_END = 1712;

// Frames are global; scene starts: 0, 228, 375, 654, 759, 852, 939, 1092, 1224, 1410, 1560.
const SFX: Sfx[] = [
  // 01 Som R+D
  { at: 190, file: "whip", volume: 0.2 },
  // 02 El bucle
  { at: 246, file: "whoosh", volume: 0.2 },
  { at: 328, file: "whoosh", volume: 0.3 },
  // 03 Iteracions: every new version of the button
  ...[425, 490, 530, 595].map((at) => ({ at, file: "mouse-click", volume: 0.45 })),
  ...[611, 619, 625, 630, 634, 638, 641, 644, 647].map((at) => ({ at, file: "switch", volume: 0.25 })),
  // 04 Fitxer final
  { at: 654, file: "whip", volume: 0.3 },
  { at: 728, file: "ding", volume: 0.3 },
  // 05 Sortir del bucle
  { at: 819, file: "whoosh", volume: 0.35 },
  // 06 Claude Design
  { at: 852, file: "whoosh", volume: 0.35 },
  { at: 924, file: "mouse-click", volume: 0.6 },
  // 07 Marca
  ...[967, 1002, 1026, 1055].map((at) => ({ at, file: "page-turn", volume: 0.25 })),
  // 08 Variants
  { at: 1098, file: "whoosh", volume: 0.25 },
  { at: 1112, file: "whoosh", volume: 0.25 },
  { at: 1197, file: "shutter-modern", volume: 0.3 },
  // 09 Prototip, presentació, codi
  { at: 1234, file: "whoosh", volume: 0.2 },
  { at: 1306, file: "mouse-click", volume: 0.6 },
  { at: 1332, file: "page-turn", volume: 0.3 },
  { at: 1374, file: "whip", volume: 0.3 },
  // 10 Menys voltes
  { at: 1420, file: "whoosh", volume: 0.3 },
  // 11 Tancament
  { at: 1560, file: "whoosh", volume: 0.3 },
  { at: 1692, file: "ding", volume: 0.3 },
];

// "It's Love" by Mixkit (Mixkit License). Its drop at 39.29 s lands on the title cut (frame 852).
const MUSIC_TRIM = 327;
const DROP = 852;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The voice runs almost without pause from 1.3 s to 56.6 s, so the music sits low under it
// and only opens up before the first word and after the last one.
const musicVolume = (f: number) => {
  const underVoice = f < DROP ? 0.2 : 0.1;
  const intro = interpolate(f, [30, 42], [0.4, underVoice], clamp);
  const outro = interpolate(f, [1700, 1716], [underVoice, 0.4], clamp);
  const fade = interpolate(f, [1755, 1799], [1, 0], clamp);
  return (f < 42 ? intro : f > 1700 ? outro : underVoice) * fade;
};

// Voice-over, music and sound effects from remotion.media.
export const SoundTrack: React.FC = () => {
  return (
    <>
      <Audio
        name="Música"
        src={staticFile("music/mixkit-its-love-834.mp3")}
        trimBefore={MUSIC_TRIM}
        volume={musicVolume}
      />
      <Sequence name="Locució" durationInFrames={VOICE_END} layout="none">
        <Audio
          src={staticFile("voice/locucio.wav")}
          volume={(f) =>
            interpolate(f, [VOICE_END - 12, VOICE_END], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={sfx.at} durationInFrames={90} name={`SFX ${sfx.file}`} layout="none">
          <Audio src={staticFile(`sfx/${sfx.file}.wav`)} volume={sfx.volume} />
        </Sequence>
      ))}
    </>
  );
};
