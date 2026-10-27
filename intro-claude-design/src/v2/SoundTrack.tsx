import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

type Sfx = { at: number; file: string; volume: number };

// Frames are global; scene starts: 0, 150, 300, 510, 630, 750, 870, 1020, 1200, 1350, 1530.
const SFX: Sfx[] = [
  // 01 Som R+D
  { at: 112, file: "whip", volume: 0.3 },
  // 02 El bucle
  { at: 150, file: "whoosh", volume: 0.3 },
  { at: 245, file: "whoosh", volume: 0.4 },
  // 03 Iteracions: every new version of the button
  ...[335, 370, 405, 440].map((at) => ({ at, file: "mouse-click", volume: 0.6 })),
  ...[458, 466, 473, 479, 484, 489, 493, 497, 501].map((at) => ({ at, file: "switch", volume: 0.35 })),
  // 04 Fitxer final
  { at: 510, file: "whip", volume: 0.4 },
  { at: 578, file: "ding", volume: 0.4 },
  // 05 Sortir del bucle
  { at: 686, file: "whoosh", volume: 0.5 },
  // 06 Claude Design
  { at: 750, file: "whoosh", volume: 0.5 },
  { at: 830, file: "mouse-click", volume: 0.8 },
  // 07 Marca
  ...[892, 920, 946, 974].map((at) => ({ at, file: "page-turn", volume: 0.35 })),
  // 08 Variants
  { at: 1056, file: "whoosh", volume: 0.35 },
  { at: 1106, file: "whoosh", volume: 0.35 },
  { at: 1170, file: "shutter-modern", volume: 0.4 },
  // 09 Prototip, presentació, codi
  { at: 1200, file: "whoosh", volume: 0.3 },
  { at: 1240, file: "mouse-click", volume: 0.8 },
  { at: 1258, file: "page-turn", volume: 0.4 },
  { at: 1300, file: "whip", volume: 0.4 },
  // 10 Menys voltes
  { at: 1356, file: "whoosh", volume: 0.45 },
  // 11 Tancament
  { at: 1530, file: "whoosh", volume: 0.4 },
  { at: 1630, file: "ding", volume: 0.35 },
];

// Sound effects from remotion.media. Music goes here once it is chosen.
export const SoundTrack: React.FC = () => {
  return (
    <>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={sfx.at} durationInFrames={90} name={`SFX ${sfx.file}`} layout="none">
          <Audio src={staticFile(`sfx/${sfx.file}.wav`)} volume={sfx.volume} />
        </Sequence>
      ))}
    </>
  );
};
