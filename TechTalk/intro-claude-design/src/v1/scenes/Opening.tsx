import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { RevealWords } from "../../components/RevealWords";
import { SlantedBand } from "../../components/SlantedBand";
import { colors, EASE_OUT, fontFamily } from "../../theme";

export const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <SlantedBand color={colors.orange} top={760} height={170} delay={4} />
      <SlantedBand color={colors.grey} top={965} height={36} delay={12} />
      <AbsoluteFill
        style={{ justifyContent: "center", paddingLeft: 160, paddingBottom: 260 }}
      >
        <div
          style={{
            color: colors.orange,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.3em",
            marginBottom: 28,
            opacity: interpolate(frame, [10, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [10, 34], ["-40px 0px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
          }}
        >
          TECH TALK · R+D
        </div>
        <RevealWords
          words={[{ text: "Quercus" }, { text: "Technologies" }]}
          delay={16}
          stagger={6}
          style={{
            color: colors.white,
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
