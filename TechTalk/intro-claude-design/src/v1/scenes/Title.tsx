import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, EASE_OUT, fontFamily } from "../../theme";

const LETTERS = "Claude Design".split("");

export const Title: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.orange,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Oversized grey square drifting behind the title */}
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          right: -380,
          bottom: -520,
          backgroundColor: colors.grey,
          rotate: interpolate(frame, [0, 105], ["-30deg", "-8deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
          translate: interpolate(frame, [0, 30], ["400px 400px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      />
      <div style={{ position: "relative", textAlign: "center" }}>
        <div
          style={{
            color: colors.white,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "0.3em",
            marginBottom: 10,
            opacity: interpolate(frame, [26, 44], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          US PRESENTEM
        </div>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            paddingBottom: 16,
            color: colors.white,
            fontSize: 230,
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
                translate: interpolate(
                  frame,
                  [4 + i * 2, 28 + i * 2],
                  ["0px 120%", "0px 0%"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...EASE_OUT),
                  },
                ),
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div
          style={{
            margin: "0 auto",
            height: 14,
            width: 520,
            backgroundColor: colors.white,
            scale: interpolate(frame, [34, 60], ["0 1", "1 1"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
