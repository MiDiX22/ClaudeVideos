import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { overshoot, prog } from "../../anim";
import { RevealWords } from "../../components/RevealWords";
import { colors, fontFamily } from "../../theme";

// "Menys voltes. Més criteri. I més temps per al que sabem fer."
export const S10Mantra: React.FC = () => {
  const frame = useCurrentFrame();
  const spin = interpolate(frame, [10, 40], [-720, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: overshoot,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily, overflow: "hidden" }}>
      <svg width={1400} height={1400} style={{ position: "absolute", left: 1150, top: -160, overflow: "visible" }}>
        <circle
          cx={700}
          cy={700}
          r={600}
          fill="none"
          stroke="#3a3a39"
          strokeWidth={60}
          strokeDasharray="60 40"
          transform={`rotate(${interpolate(frame, [0, 44], [0, 540], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })} 700 700)`}
        />
      </svg>
      <div style={{ position: "absolute", left: 160, top: 190, color: colors.white, fontSize: 130, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.15 }}>
        <div style={{ display: "flex", gap: "0.25em" }}>
          <RevealWords words={[{ text: "Menys" }]} delay={8} />
          <span
            style={{
              display: "inline-block",
              color: colors.orange,
              rotate: `${spin}deg`,
              opacity: prog(frame, 10, 6),
            }}
          >
            voltes.
          </span>
        </div>
        <div style={{ position: "relative", display: "inline-block" }}>
          <RevealWords words={[{ text: "Més" }, { text: "criteri." }]} delay={43} stagger={6} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 6,
              height: 14,
              backgroundColor: colors.orange,
              scale: `${prog(frame, 58, 18)} 1`,
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>
      <div style={{ position: "absolute", left: 160, top: 640 }}>
        <RevealWords
          words={[
            { text: "I" },
            { text: "més" },
            { text: "temps" },
            { text: "per" },
            { text: "al" },
            { text: "que" },
            { text: "sabem", color: colors.orange },
            { text: "fer.", color: colors.orange },
          ]}
          delay={81}
          stagger={4}
          style={{ color: colors.white, fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em" }}
        />
      </div>
    </AbsoluteFill>
  );
};
