import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { easeInOut, easeOut, lerp, prog } from "../../anim";
import { colors, fontFamily } from "../../theme";
import { LINE_Y } from "./S05Break";

const LETTERS = "Claude Design".split("");

// "Us presento Claude Design." The line from the broken loop floods the frame.
export const S06Title: React.FC = () => {
  const frame = useCurrentFrame();
  const flood = prog(frame, 0, 18, easeInOut);

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
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          right: -380,
          bottom: -520,
          backgroundColor: colors.grey,
          rotate: interpolate(frame, [10, 120], ["-30deg", "-8deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          translate: `${400 * (1 - prog(frame, 10, 30))}px ${400 * (1 - prog(frame, 10, 30))}px`,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: String(lerp(1, 1.04, prog(frame, 20, 100, easeInOut))),
        }}
      >
        <div
          style={{
            color: colors.white,
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: "0.3em",
            marginBottom: 10,
            opacity: prog(frame, 14, 14),
            translate: `0px ${20 * (1 - prog(frame, 14, 20))}px`,
          }}
        >
          US PRESENTO
        </div>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            paddingBottom: 16,
            color: colors.white,
            fontSize: 240,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                translate: `0px ${120 * (1 - prog(frame, 16 + i * 2, 24, easeOut))}%`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            height: 14,
            width: 540,
            backgroundColor: colors.white,
            scale: `${prog(frame, 44, 26)} 1`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
