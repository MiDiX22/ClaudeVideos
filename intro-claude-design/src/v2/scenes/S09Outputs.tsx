import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeIn, easeInOut, easeOut, lerp, overshoot, prog } from "../../anim";
import { MiniScreen, SCREEN_H, SCREEN_W } from "../../components/MiniScreen";
import { colors, fontFamily, monoFamily } from "../../theme";
import { CHOSEN, chosenRect } from "./S08Variants";

const SCALE = 1.1;
const CY = 570;
// A map pin of variant 2, in screen coordinates.
const PIN = { x: 381, y: 269 };

const STAGES = [
  { at: 72, label: "Prototip" },
  { at: 108, label: "Presentació" },
  { at: 150, label: "Codi" },
];

type Token = [string, string];
const TAG = colors.orange;
const ATTR = "#d5d6d7";
const STR = "#f7bc88";
const PUNCT = "#8a8a88";
const CODE: Token[][] = [
  [["<", PUNCT], ["TopBar", TAG], [" product", ATTR], ["=", PUNCT], ['"BirdWatch"', STR], [" module", ATTR], ["=", PUNCT], ['"Parking"', STR], [" />", PUNCT]],
  [["<", PUNCT], ["NavBar", TAG], [" color", ATTR], ["=", PUNCT], ['"brand-orange"', STR], [" />", PUNCT]],
  [["<", PUNCT], ["OccupancyMap", TAG], [" level", ATTR], ["=", PUNCT], ["{1}", STR], [">", PUNCT]],
  [["  <", PUNCT], ["Spot", TAG], [" id", ATTR], ["=", PUNCT], ['"214"', STR], [" status", ATTR], ["=", PUNCT], ['"occupied"', STR], [" />", PUNCT]],
  [["</", PUNCT], ["OccupancyMap", TAG], [">", PUNCT]],
  [["<", PUNCT], ["Stat", TAG], [" label", ATTR], ["=", PUNCT], ['"Occupancy"', STR], [" value", ATTR], ["=", PUNCT], ['"87%"', STR], [" />", PUNCT]],
];
const TOTAL_CHARS = CODE.reduce((sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0), 0);

const StageChip: React.FC = () => {
  const frame = useCurrentFrame();
  const current = [...STAGES].reverse().find((s) => frame >= s.at);
  if (!current) {
    return null;
  }
  const t = prog(frame, current.at, 14, overshoot);

  return (
    <div style={{ position: "absolute", top: 40, width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        key={current.label}
        style={{
          backgroundColor: colors.orange,
          color: colors.white,
          fontSize: 40,
          fontWeight: 800,
          padding: "10px 36px",
          scale: String(lerp(0.6, 1, t)),
          opacity: prog(frame, current.at, 6),
        }}
      >
        {current.label}
      </div>
    </div>
  );
};

const Cursor: React.FC<{ x: number; y: number; press: number; opacity: number }> = ({ x, y, press, opacity }) => (
  <svg
    width={60}
    height={60}
    viewBox="0 0 24 24"
    style={{ position: "absolute", left: x - 6, top: y - 3, scale: String(1 - 0.15 * press), opacity, overflow: "visible" }}
  >
    <path d="M3 2 L3 20 L8 15 L11.5 22 L14.5 20.5 L11 14 L18 14 Z" fill={colors.white} stroke={colors.ink} strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

const CodePanel: React.FC = () => {
  const frame = useCurrentFrame();
  let remaining = Math.floor(TOTAL_CHARS * prog(frame, 162, 22, (t) => t));

  return (
    <div style={{ width: 1400, height: 720, backgroundColor: "#1e1e1d", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
      <div style={{ height: 56, display: "flex", alignItems: "center", gap: 12, padding: "0 24px", borderBottom: "1px solid #333" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#575756" }} />
        ))}
        <div style={{ marginLeft: 16, color: "#8a8a88", fontSize: 22, fontFamily: monoFamily }}>ParkingScreen.tsx</div>
      </div>
      <div style={{ padding: "40px 48px", fontFamily: monoFamily, fontSize: 34, lineHeight: 1.75, whiteSpace: "pre" }}>
        {CODE.map((line, i) => (
          <div key={i} style={{ height: "1.75em" }}>
            {line.map(([text, color], j) => {
              const shown = text.slice(0, Math.max(0, remaining));
              remaining -= text.length;
              return (
                <span key={j} style={{ color }}>
                  {shown}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// "…i quan una t'agrada, la tens en prototip, en presentació o directament en codi."
export const S09Outputs: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = prog(frame, 8, 20, easeInOut);
  const slide = prog(frame, 108, 22, easeInOut);
  const flipOut = prog(frame, 150, 8, easeIn);
  const flipIn = prog(frame, 158, 12, easeOut);

  const scale = lerp(lerp(chosenRect.s, SCALE, zoom), 0.8, slide);
  const cx = lerp(lerp(chosenRect.x, 960, zoom), 960 + 330, slide);
  const cy = lerp(chosenRect.y, CY, zoom);

  const pinX = 960 - (SCREEN_W * SCALE) / 2 + PIN.x * SCALE;
  const pinY = CY - (SCREEN_H * SCALE) / 2 + PIN.y * SCALE;
  const move = prog(frame, 58, 20, easeInOut);
  const press = prog(frame, 80, 3) * (1 - prog(frame, 84, 4));
  const ripple = prog(frame, 80, 16);
  const panel = prog(frame, 84, 16);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily, perspective: 2400 }}>
      {/* Slide + screen, which flip away to reveal the code */}
      <AbsoluteFill style={{ rotate: `y ${90 * flipOut}deg`, opacity: flipOut >= 1 ? 0 : 1 }}>
        <div
          style={{
            position: "absolute",
            left: 210,
            top: CY - 422,
            width: 1500,
            height: 844,
            backgroundColor: colors.surface,
            opacity: slide,
            scale: String(lerp(1.2, 1, slide)),
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 70, top: 260 }}>
            <div style={{ color: colors.orange, fontSize: 22, fontWeight: 700, letterSpacing: "0.25em", marginBottom: 14 }}>
              PARKING · BIRDWATCH
            </div>
            <div style={{ color: colors.ink, fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Nova pantalla
              <br />
              d'ocupació
            </div>
          </div>
          <div style={{ position: "absolute", left: 70, bottom: 50, color: colors.grey, fontSize: 24, fontWeight: 600 }}>
            03 / 12
          </div>
          <div style={{ position: "absolute", left: -100, right: -100, bottom: -60, height: 90, backgroundColor: colors.orange, rotate: "-3deg" }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: cx - SCREEN_W / 2,
            top: cy - SCREEN_H / 2,
            width: SCREEN_W,
            height: SCREEN_H,
            scale: String(scale),
            outline: `${lerp(18, 0, zoom)}px solid ${colors.orange}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          <MiniScreen variant={CHOSEN}>
            <div
              style={{
                position: "absolute",
                left: PIN.x - 40,
                top: PIN.y - 40,
                width: 80,
                height: 80,
                borderRadius: 40,
                border: `4px solid ${colors.orange}`,
                scale: String(lerp(0.3, 1.6, ripple)),
                opacity: ripple > 0 && ripple < 1 ? 1 - ripple : 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 74,
                width: 300,
                height: SCREEN_H - 74,
                backgroundColor: colors.white,
                boxShadow: "-6px 0 20px rgba(0,0,0,0.15)",
                padding: 24,
                boxSizing: "border-box",
                translate: `${(1 - panel) * 320}px 0px`,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: colors.grey }}>SPOT 214</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: colors.ink, marginTop: 8 }}>Occupied</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: colors.orange }}>2h 14m</div>
              {[200, 160, 220, 120].map((w, i) => (
                <div key={i} style={{ width: w, height: 10, borderRadius: 5, backgroundColor: "#e4e4e2", marginTop: i === 0 ? 30 : 14 }} />
              ))}
            </div>
          </MiniScreen>
        </div>
        <Cursor
          x={lerp(1500, pinX, move)}
          y={lerp(980, pinY, move)}
          press={press}
          opacity={prog(frame, 56, 6) * (1 - prog(frame, 100, 8))}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 60,
          rotate: `y ${-90 * (1 - flipIn)}deg`,
          opacity: flipIn > 0 ? 1 : 0,
        }}
      >
        <CodePanel />
      </AbsoluteFill>

      <StageChip />
    </AbsoluteFill>
  );
};
