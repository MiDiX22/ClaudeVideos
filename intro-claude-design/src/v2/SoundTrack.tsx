import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

type Sfx = { at: number; file: string; volume?: number };

const range = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

const typing = (from: number, to: number): Sfx[] =>
  range(from, to, 2).map((at) => ({ at, file: "click-002.mp3", volume: 0.35 }));

// Frames are global; scene starts: 0, 150, 300, 510, 630, 750, 870, 1020, 1200, 1350, 1530.
const SFX: Sfx[] = [
  // 01 Som R+D: one tick per word
  ...[0, 34, 62, 88, 112].map((at) => ({ at, file: "tick-004.mp3", volume: 0.7 })),
  ...[34, 62, 88, 112].map((at) => ({ at, file: "whoosh-short.wav", volume: 0.2 })),
  // 02 El bucle
  { at: 150, file: "whoosh-short.wav", volume: 0.35 },
  { at: 216, file: "card-slide-4.mp3", volume: 0.5 },
  { at: 245, file: "whoosh-long.wav", volume: 0.4 },
  { at: 250, file: "tick-004.mp3", volume: 0.6 },
  // 03 Iteracions: every new version of the button
  ...[335, 370, 405, 440].map((at) => ({ at, file: "toggle-001.mp3", volume: 0.8 })),
  ...[458, 466, 473, 479, 484, 489, 493, 497, 501].map((at) => ({ at, file: "click-001.mp3", volume: 0.6 })),
  // 04 Fitxer final
  { at: 510, file: "whoosh-down.wav", volume: 0.4 },
  ...typing(524, 568),
  { at: 578, file: "question-001.mp3", volume: 0.6 },
  // 05 Sortir del bucle
  { at: 632, file: "whoosh-short.wav", volume: 0.3 },
  { at: 686, file: "whoosh-long.wav", volume: 0.5 },
  // 06 Claude Design (the music hits at 750)
  { at: 764, file: "whoosh-short.wav", volume: 0.3 },
  { at: 774, file: "notification-pop.mp3", volume: 0.5 },
  { at: 802, file: "select-005.mp3", volume: 0.5 },
  { at: 830, file: "click-001.mp3", volume: 0.9 },
  { at: 832, file: "switch-on.mp3", volume: 0.5 },
  // 07 Marca
  { at: 870, file: "whoosh-short.wav", volume: 0.35 },
  ...[892, 920, 946, 974].map((at) => ({ at, file: "card-place-2.mp3", volume: 0.6 })),
  // 08 Variants
  { at: 1056, file: "whoosh-long.wav", volume: 0.35 },
  ...[1060, 1064, 1068].map((at) => ({ at, file: "tick-001.mp3", volume: 0.5 })),
  { at: 1106, file: "whoosh-long.wav", volume: 0.35 },
  ...range(1116, 1136, 4).map((at) => ({ at, file: "tick-001.mp3", volume: 0.5 })),
  { at: 1170, file: "select-005.mp3", volume: 0.6 },
  // 09 Prototip, presentació, codi
  { at: 1200, file: "whoosh-short.wav", volume: 0.35 },
  { at: 1218, file: "tick-004.mp3", volume: 0.6 },
  { at: 1240, file: "click-001.mp3", volume: 0.9 },
  { at: 1244, file: "card-slide-4.mp3", volume: 0.5 },
  { at: 1256, file: "tick-004.mp3", volume: 0.6 },
  { at: 1258, file: "whoosh-long.wav", volume: 0.35 },
  { at: 1300, file: "whoosh-short.wav", volume: 0.4 },
  { at: 1300, file: "tick-004.mp3", volume: 0.6 },
  ...typing(1316, 1348),
  // 10 Menys voltes
  { at: 1356, file: "whoosh-long.wav", volume: 0.45 },
  { at: 1394, file: "drop-002.mp3", volume: 0.7 },
  { at: 1402, file: "whoosh-short.wav", volume: 0.3 },
  { at: 1422, file: "card-slide-4.mp3", volume: 0.4 },
  { at: 1454, file: "whoosh-short.wav", volume: 0.3 },
  // 11 Tancament
  { at: 1530, file: "whoosh-long.wav", volume: 0.45 },
  { at: 1570, file: "whoosh-short.wav", volume: 0.25 },
  { at: 1626, file: "notification-pop.mp3", volume: 0.5 },
  { at: 1630, file: "success-chime.mp3", volume: 0.45 },
];

// Music bed (synthesised in audio-src/synth.py) plus CC0 sound effects (Kenney, via soundcn).
export const SoundTrack: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("music/music-bed.mp3")} volume={0.42} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={sfx.at} durationInFrames={60} name={`SFX ${sfx.file}`} layout="none">
          <Audio src={staticFile(`sfx/${sfx.file}`)} volume={sfx.volume ?? 0.5} />
        </Sequence>
      ))}
    </>
  );
};
