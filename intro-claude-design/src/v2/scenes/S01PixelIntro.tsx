import { AbsoluteFill, interpolateColors, random, useCurrentFrame } from "remotion";
import { easeInOut, lerp, prog } from "../../anim";
import { WordSwap } from "../../components/WordSwap";
import { colors, fontFamily } from "../../theme";

const COLS = 16;
const ROWS = 10;
const PITCH = 44;
const CELL = 36;
const GRID_W = COLS * PITCH - (PITCH - CELL);
const GRID_H = ROWS * PITCH - (PITCH - CELL);

const parse = (rows: string[]) => rows.map((r) => r.split("").map((c) => c === "X"));

const SCATTER = Array.from({ length: ROWS }, (_, y) =>
  Array.from({ length: COLS }, (_, x) => random(`px-${x}-${y}`) > 0.72),
);
const EYE = parse([
  "................",
  ".....XXXXXX.....",
  "...XX......XX...",
  ".XX....XX....XX.",
  "X.....XXXX.....X",
  "X.....XXXX.....X",
  ".XX....XX....XX.",
  "...XX......XX...",
  ".....XXXXXX.....",
  "................",
]);
const PLATE = parse([
  "XXXXXXXXXXXXXXXX",
  "X..............X",
  "X.XX.XXX.XX.XX.X",
  "X.X..X.X..X..X.X",
  "X.XX.XXX..X.XX.X",
  "X..X.X.X..X..X.X",
  "X.XX.XXX.XXX.X.X",
  "X..............X",
  "XXXXXXXXXXXXXXXX",
  "................",
]);
const SPOT = parse([
  "X..............X",
  "X...XXXXXX.....X",
  "X...X.....X....X",
  "X...X.....X....X",
  "X...XXXXXX.....X",
  "X...X..........X",
  "X...X..........X",
  "X...X..........X",
  "X..............X",
  "XXXXXXXXXXXXXXXX",
]);
const PARKING = parse([
  "X.X.X.X.X.X.X.X.",
  "X.X.X.X.X.X.X.X.",
  "XXXXXXXXXXXXXXX.",
  "................",
  "..XX........XX..",
  "................",
  "XXXXXXXXXXXXXXX.",
  "X.X.X.X.X.X.X.X.",
  "X.X.X.X.X.X.X.X.",
  "................",
]);

// Frames match the voice-over: "Som R+D. Fem visió artificial, LPRs, Spots… aparcaments sencers."
const KEYS = [
  { at: 0, shape: SCATTER },
  { at: 34, shape: EYE },
  { at: 62, shape: PLATE },
  { at: 88, shape: SPOT },
  { at: 112, shape: PARKING },
];

const Pixel: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const wave = x * 0.9 + y * 0.5;
  let on = 0;
  for (const key of KEYS) {
    on = lerp(on, key.shape[y][x] ? 1 : 0, prog(frame, key.at + wave, 10));
  }
  const presence = prog(frame, wave, 14);

  return (
    <div
      style={{
        position: "absolute",
        left: x * PITCH,
        top: y * PITCH,
        width: CELL,
        height: CELL,
        backgroundColor: interpolateColors(on, [0, 1], ["#3a3a39", colors.orange]),
        scale: String(presence * (0.42 + 0.58 * on)),
      }}
    />
  );
};

export const S01PixelIntro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 120,
          color: colors.orange,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.3em",
          opacity: prog(frame, 4, 16),
        }}
      >
        QUERCUS TECHNOLOGIES
      </div>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: (1080 - GRID_H) / 2 + 30,
          width: GRID_W,
          height: GRID_H,
          scale: String(lerp(1, 0.86, prog(frame, 112, 38, easeInOut))),
        }}
      >
        {Array.from({ length: ROWS }, (_, y) =>
          Array.from({ length: COLS }, (_, x) => <Pixel key={`${x}-${y}`} x={x} y={y} />),
        )}
      </div>
      <WordSwap
        end={150}
        items={[
          { at: 0, lines: ["Som R+D."] },
          { at: 34, lines: ["Visió", "artificial"] },
          { at: 62, lines: ["LPR"] },
          { at: 88, lines: ["Spot"] },
          { at: 112, lines: ["Aparcaments", "sencers."], color: colors.orange },
        ]}
        style={{
          left: 1000,
          top: 570,
          color: colors.white,
          fontSize: 112,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      />
    </AbsoluteFill>
  );
};
