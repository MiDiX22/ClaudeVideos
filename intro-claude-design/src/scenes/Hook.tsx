import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { RevealWords } from "../components/RevealWords";
import { colors, EASE_OUT, fontFamily } from "../theme";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.ink,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          scale: interpolate(frame, [0, 120], [1, 1.06], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          textAlign: "center",
        }}
      >
        <RevealWords
          words={[{ text: "I si" }, { text: "dissenyar" }, { text: "fos" }]}
          delay={4}
          stagger={7}
          style={{
            justifyContent: "center",
            color: colors.white,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        />
        <RevealWords
          words={[
            { text: "tan fàcil com" },
            { text: "conversar?", color: colors.orange },
          ]}
          delay={26}
          stagger={10}
          style={{
            justifyContent: "center",
            color: colors.white,
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        />
        <div
          style={{
            margin: "40px auto 0",
            height: 12,
            width: 360,
            backgroundColor: colors.orange,
            transformOrigin: "left center",
            scale: interpolate(frame, [48, 72], ["0 1", "1 1"], {
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
