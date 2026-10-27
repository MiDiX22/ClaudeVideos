import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { easeOut, lerp, overshoot, prog } from "../../anim";
import { RevealWords } from "../../components/RevealWords";
import { SlantedBand } from "../../components/SlantedBand";
import { colors, fontFamily } from "../../theme";

const LETTERS = "Claude Design".split("");

// "Benvinguts a la presentació del vostre dissenyador gràfic de confiança."
export const S11Outro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily, overflow: "hidden" }}>
      <SlantedBand color={colors.orange} top={930} height={170} delay={0} angle={-5} />
      <SlantedBand color={colors.ink} top={-140} height={150} delay={6} angle={-5} />
      <div style={{ position: "absolute", left: 160, top: 210 }}>
        <div
          style={{
            color: colors.white,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.3em",
            opacity: prog(frame, 8, 14),
            translate: `${-30 * (1 - prog(frame, 8, 20))}px 0px`,
          }}
        >
          TECH TALK · R+D
        </div>
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            paddingBottom: 12,
            color: colors.white,
            fontSize: 180,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                whiteSpace: "pre",
                translate: `0px ${120 * (1 - prog(frame, 12 + i * 2, 24, easeOut))}%`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <RevealWords
          words={"el teu dissenyador gràfic de confiança".split(" ").map((text) => ({ text }))}
          delay={40}
          stagger={3}
          style={{ color: colors.white, fontSize: 60, fontWeight: 400, letterSpacing: "-0.01em" }}
        />
        <div
          style={{
            width: 160,
            height: 10,
            backgroundColor: colors.orange,
            marginTop: 56,
            marginBottom: 40,
            scale: `${prog(frame, 70, 20)} 1`,
            transformOrigin: "left center",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <RevealWords
            words={[{ text: "Miriam" }, { text: "Gertrudix" }]}
            delay={80}
            stagger={4}
            style={{ color: colors.white, fontSize: 52, fontWeight: 700 }}
          />
          <div
            style={{
              border: `3px solid ${colors.white}`,
              borderRadius: 9999,
              color: colors.white,
              fontSize: 32,
              fontWeight: 600,
              padding: "8px 30px",
              opacity: prog(frame, 96, 8),
              scale: String(lerp(0.6, 1, prog(frame, 96, 16, overshoot))),
            }}
          >
            Properament
          </div>
        </div>
      </div>
      <Img
        src={staticFile("quercus-logo-white.png")}
        style={{
          position: "absolute",
          right: 140,
          top: 120,
          width: 360,
          opacity: prog(frame, 100, 16),
          translate: `0px ${20 * (1 - prog(frame, 100, 24))}px`,
        }}
      />
    </AbsoluteFill>
  );
};
