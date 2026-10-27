import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../../anim";
import { RevealWords } from "../../components/RevealWords";
import { MiniScreen, SCREEN_H, SCREEN_W } from "../../components/MiniScreen";
import { colors, fontFamily } from "../../theme";

export const CHOSEN = 2;
const CENTER_Y = 610;

type Rect = { x: number; y: number; s: number };

// Centre point and scale of screen i in a cols × rows grid.
const gridRect = (i: number, cols: number, rows: number, s: number, gap: number): Rect => {
  const w = SCREEN_W * s;
  const h = SCREEN_H * s;
  const col = i % cols;
  const row = Math.floor(i / cols);
  return {
    x: 960 + (col - (cols - 1) / 2) * (w + gap),
    y: CENTER_Y + (row - (rows - 1) / 2) * (h + gap),
    s,
  };
};

const PHASE1 = (i: number): Rect => ({ x: 960, y: CENTER_Y, s: i === 0 ? 1.15 : 0 });
const PHASE2 = (i: number) => gridRect(i, 2, 2, 0.6, 30);
const PHASE3 = (i: number) => gridRect(i, 5, 2, 0.33, 22);
export const chosenRect = PHASE3(CHOSEN);

const PHASE2_AT = 36;
const PHASE3_AT = 86;

// "…prova deu variants en el temps que nosaltres en fèiem una…"
export const S08Variants: React.FC = () => {
  const frame = useCurrentFrame();
  const t2 = prog(frame, PHASE2_AT, 30, easeInOut);
  const t3 = prog(frame, PHASE3_AT, 34, easeInOut);
  const pick = prog(frame, 150, 14);
  const count = frame < PHASE2_AT + 8 ? 1 : frame < PHASE3_AT + 8 ? 4 : 10;
  const lastChange = count === 1 ? -100 : count === 4 ? PHASE2_AT + 8 : PHASE3_AT + 8;
  const pop = 1 + 0.3 * (1 - prog(frame, lastChange, 10));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      {Array.from({ length: 10 }, (_, i) => {
        let rect: Rect;
        if (i < 4) {
          // Screens 0–3 live in the 2×2 grid, then move into the 5×2 grid.
          const from = i === 0 ? PHASE1(0) : PHASE2(i);
          const to = PHASE2(i);
          const s2 =
            i === 0 ? lerp(from.s, to.s, t2) : to.s * prog(frame, PHASE2_AT + i * 4, 24, overshoot);
          const end = PHASE3(i);
          rect = {
            x: lerp(lerp(from.x, to.x, t2), end.x, t3),
            y: lerp(lerp(from.y, to.y, t2), end.y, t3),
            s: lerp(s2, end.s, t3),
          };
        } else {
          const end = PHASE3(i);
          rect = { ...end, s: end.s * prog(frame, PHASE3_AT + 10 + (i - 4) * 4, 22, overshoot) };
        }
        const chosen = i === CHOSEN;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: rect.x - SCREEN_W / 2,
              top: rect.y - SCREEN_H / 2,
              width: SCREEN_W,
              height: SCREEN_H,
              scale: String(Math.max(rect.s, 0.0001)),
              opacity: chosen ? 1 : lerp(1, 0.3, pick),
              outline: chosen ? `${Math.round(lerp(0, 18, pick))}px solid ${colors.orange}` : undefined,
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          >
            <MiniScreen variant={i} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 70,
          display: "flex",
          alignItems: "baseline",
          gap: 22,
          color: colors.white,
        }}
      >
        <div
          style={{
            fontSize: 150,
            fontWeight: 800,
            color: colors.orange,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            scale: String(pop),
            transformOrigin: "left bottom",
          }}
        >
          {count}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700 }}>{count === 1 ? "variant" : "variants"}</div>
      </div>
      <div style={{ position: "absolute", right: 120, top: 120 }}>
        <RevealWords
          words={[{ text: "…en" }, { text: "el" }, { text: "temps" }, { text: "d'una." , color: colors.orange }]}
          delay={112}
          stagger={4}
          style={{ color: colors.white, fontSize: 56, fontWeight: 700 }}
        />
      </div>
    </AbsoluteFill>
  );
};
