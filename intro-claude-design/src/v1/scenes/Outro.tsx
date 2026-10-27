import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { RevealWords } from "../../components/RevealWords";
import { SlantedBand } from "../../components/SlantedBand";
import { colors, EASE_OUT, fontFamily } from "../../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily }}>
      <SlantedBand color={colors.orange} top={900} height={150} delay={2} angle={-6} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 160,
        }}
      >
        <Img
          src={staticFile("quercus-logo-white.png")}
          style={{
            width: 560,
            opacity: interpolate(frame, [8, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [8, 40], [0.9, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...EASE_OUT),
            }),
          }}
        />
        <RevealWords
          words={[
            { text: "Tech Talk" },
            { text: "·", color: colors.orange },
            { text: "Claude Design" },
          ]}
          delay={22}
          stagger={5}
          style={{
            marginTop: 56,
            justifyContent: "center",
            color: colors.white,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        />
        <div
          style={{
            marginTop: 20,
            color: colors.white,
            fontSize: 44,
            fontWeight: 400,
            opacity: interpolate(frame, [44, 62], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Departament de R+D · Us hi esperem!
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
