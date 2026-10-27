import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, prog } from "../../anim";
import { LoopRing } from "../../components/LoopRing";
import { RevealWords } from "../../components/RevealWords";
import { Wireframe } from "../../components/Wireframe";
import { colors, fontFamily } from "../../theme";

export const RING_START = 95;
export const RING_SPEED = 3;

// "Però quan toca dissenyar una pantalla… comença el bucle."
export const S02Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const textOut = prog(frame, 60, 16, easeInOut);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: 1 - textOut,
          translate: `0px ${-textOut * 120}px`,
        }}
      >
        <RevealWords
          words={[{ text: "Però" }, { text: "quan" }, { text: "toca" }, { text: "dissenyar" }]}
          delay={2}
          stagger={4}
          style={{ justifyContent: "center", color: colors.white, fontSize: 104, fontWeight: 800, letterSpacing: "-0.03em" }}
        />
        <RevealWords
          words={[{ text: "una" }, { text: "pantalla…", color: colors.orange }]}
          delay={18}
          stagger={5}
          style={{ justifyContent: "center", color: colors.white, fontSize: 104, fontWeight: 800, letterSpacing: "-0.03em" }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Wireframe draw={prog(frame, 66, 40, easeInOut)} buttonX={0} buttonScale={1} width={675} />
      </AbsoluteFill>
      <LoopRing
        cx={960}
        cy={540}
        radius={440}
        draw={prog(frame, RING_START, 30)}
        rotation={Math.max(0, frame - RING_START) * RING_SPEED}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 110,
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        <RevealWords words={[{ text: "comença" }]} delay={100} style={{ color: colors.white }} />
        <RevealWords words={[{ text: "el bucle." }]} delay={106} style={{ color: colors.orange }} />
      </div>
    </AbsoluteFill>
  );
};
