import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { lerp, linear, overshoot, prog } from "../../anim";
import { LoopRing } from "../../components/LoopRing";
import { WordSwap } from "../../components/WordSwap";
import { Wireframe } from "../../components/Wireframe";
import { colors, fontFamily } from "../../theme";
import { RING_SPEED, RING_START } from "./S02Loop";

const RAPID = [158, 166, 173, 179, 184, 189, 193, 197, 201];

// Each change of the button is a new version of the design.
const VERSIONS = [
  { at: 35, x: 1, s: 1 },
  { at: 70, x: 1, s: 1.5 },
  { at: 105, x: 1, s: 2.3 },
  { at: 140, x: 1, s: 1 },
  ...RAPID.map((at, i) => ({
    at,
    x: random(`x-${i}`),
    s: 0.8 + random(`s-${i}`) * 1.2,
  })),
];

export const S03_DURATION = 210;
export const ringRotationS3 = (frame: number) =>
  (150 - RING_START) * RING_SPEED + RING_SPEED * frame + 0.03 * frame * frame;

export const buttonAt = (frame: number) => {
  let x = 0;
  let s = 1;
  for (const v of VERSIONS) {
    const rapid = v.at >= RAPID[0];
    const t = prog(frame, v.at, rapid ? 3 : 14, rapid ? linear : overshoot);
    x = lerp(x, v.x, t);
    s = lerp(s, v.s, t);
  }
  return { x, s };
};

const VersionCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const passed = VERSIONS.filter((v) => v.at <= frame);
  const last = passed.length > 0 ? passed[passed.length - 1].at : -100;
  const pop = 1 + 0.25 * (1 - prog(frame, last, 8));

  return (
    <div style={{ position: "absolute", left: 1480, top: 330, color: colors.white }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.3em", color: "#8a8a88" }}>
        VERSIÓ
      </div>
      <div
        style={{
          fontSize: 200,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: colors.orange,
          scale: String(pop),
          transformOrigin: "left center",
        }}
      >
        v{passed.length + 1}
      </div>
    </div>
  );
};

// "Botó a l'esquerra. No, a la dreta. Més gran. Massa gran. Tornem a la versió 3…"
export const S03Iterations: React.FC = () => {
  const frame = useCurrentFrame();
  const button = buttonAt(frame);
  const shake = frame > RAPID[0] ? (random(`shake-${frame}`) - 0.5) * 8 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", translate: `${shake}px 0px` }}>
        <Wireframe draw={1} buttonX={button.x} buttonScale={button.s} width={675} />
      </AbsoluteFill>
      <LoopRing cx={960} cy={540} radius={440} draw={1} rotation={ringRotationS3(frame)} />
      <WordSwap
        end={S03_DURATION}
        items={[
          { at: 0, lines: ["Botó a", "l'esquerra."] },
          { at: 35, lines: ["No, a la", "dreta."] },
          { at: 70, lines: ["Més gran."] },
          { at: 105, lines: ["Massa", "gran."] },
          { at: 140, lines: ["Tornem a la", "versió 3…"], color: colors.orange },
        ]}
        style={{
          left: 90,
          top: 540,
          color: colors.white,
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      />
      <VersionCounter />
    </AbsoluteFill>
  );
};
