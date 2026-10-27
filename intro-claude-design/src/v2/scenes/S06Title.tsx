import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../../anim";
import { colors, fontFamily } from "../../theme";
import { LINE_Y } from "./S05Break";

export const CLAUDE_IVORY = "#f5f3ee";
const CLAUDE_CORAL = "#d97757";
const CLAUDE_INK = "#141413";

// Where the "Design" pill sits, for the cursor to click it.
const PILL = { x: 1490, y: 612 };

const PencilIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={52} height={52} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l4.5-1L19 8.5 15.5 5 5 15.5z" />
    <path d="M13.5 7l3.5 3.5" />
  </svg>
);

// "Us presento Claude Design." The line floods the frame, then the Claude logo
// appears next to a "Design" button that gets clicked.
export const S06Title: React.FC = () => {
  const frame = useCurrentFrame();
  const flood = prog(frame, 0, 18, easeInOut);
  const reveal = prog(frame, 14, 20, easeInOut);
  const spark = prog(frame, 24, 26, overshoot);
  const word = prog(frame, 34, 22);
  const pill = prog(frame, 52, 18, overshoot);
  const move = prog(frame, 62, 18, easeInOut);
  const press = prog(frame, 80, 3) * (1 - prog(frame, 84, 4));
  const active = prog(frame, 82, 8);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: 1920,
          top: lerp(LINE_Y - 6, 0, flood),
          height: lerp(12, 1080, flood),
          backgroundColor: colors.orange,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: CLAUDE_IVORY,
          clipPath: `circle(${reveal * 1200}px at 50% 52%)`,
        }}
      >
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            scale: String(lerp(1, 1.04, prog(frame, 30, 90, easeInOut))),
          }}
        >
          <div
            style={{
              color: colors.grey,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.3em",
              marginBottom: 40,
              opacity: prog(frame, 20, 14),
              translate: `0px ${20 * (1 - prog(frame, 20, 20))}px`,
            }}
          >
            US PRESENTO
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <Img
              src={staticFile("claude/claude-spark.svg")}
              style={{
                width: 150,
                height: 150,
                scale: String(spark),
                rotate: `${lerp(-120, 0, spark)}deg`,
              }}
            />
            <div style={{ clipPath: `inset(0 ${100 - word * 100}% 0 0)` }}>
              <Img src={staticFile("claude/claude-wordmark.svg")} style={{ height: 128 }} />
            </div>
            <div
              style={{
                marginLeft: 20,
                display: "flex",
                alignItems: "center",
                gap: 18,
                height: 116,
                padding: "0 46px 0 38px",
                borderRadius: 9999,
                border: `3px solid ${active > 0.5 ? CLAUDE_CORAL : "#dcd9d0"}`,
                backgroundColor: active > 0.5 ? "#f9e9e2" : colors.white,
                boxShadow: "0 8px 24px rgba(20,20,19,0.08)",
                color: active > 0.5 ? CLAUDE_CORAL : CLAUDE_INK,
                fontSize: 64,
                fontWeight: 600,
                scale: String(pill * (1 - 0.06 * press)),
                opacity: prog(frame, 52, 6),
              }}
            >
              <PencilIcon color={active > 0.5 ? CLAUDE_CORAL : CLAUDE_INK} />
              Design
            </div>
          </div>
        </AbsoluteFill>
        <svg
          width={60}
          height={60}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: lerp(1700, PILL.x, move) - 6,
            top: lerp(1000, PILL.y, move) - 3,
            scale: String(1 - 0.15 * press),
            opacity: prog(frame, 60, 6) * (1 - prog(frame, 104, 10)),
            overflow: "visible",
          }}
        >
          <path
            d="M3 2 L3 20 L8 15 L11.5 22 L14.5 20.5 L11 14 L18 14 Z"
            fill={colors.white}
            stroke={CLAUDE_INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
