import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { easeInOut, lerp, prog } from "../../anim";
import { LoopRing } from "../../components/LoopRing";
import { RevealWords } from "../../components/RevealWords";
import { Wireframe } from "../../components/Wireframe";
import { colors, fontFamily, monoFamily } from "../../theme";
import { buttonAt, ringRotationS3, S03_DURATION } from "./S03Iterations";

const FILENAME = "v14_final_FINAL_ara_si.fig";
const END_SPEED = 3 + 0.06 * S03_DURATION;

// "…i al final, ni tan sols sabem si està bé."
export const S04Filename: React.FC = () => {
  const frame = useCurrentFrame();
  const shrink = prog(frame, 0, 30, easeInOut);
  const button = buttonAt(S03_DURATION);
  const rotation =
    ringRotationS3(S03_DURATION) +
    interpolate(frame, [0, 40], [0, (END_SPEED * 40) / 2], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    });
  const typed = Math.floor(
    interpolate(frame, [14, 58], [0, FILENAME.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0 || (frame > 14 && frame < 58);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: String(lerp(1, 0.55, shrink)),
          translate: `0px ${-150 * shrink}px`,
          opacity: lerp(1, 0.5, shrink),
        }}
      >
        <Wireframe draw={1} buttonX={button.x} buttonScale={button.s} width={675} />
      </AbsoluteFill>
      <LoopRing
        cx={960}
        cy={540 - 150 * shrink}
        radius={440}
        draw={1}
        rotation={rotation}
        scale={lerp(1, 0.55, shrink)}
        opacity={lerp(1, 0.35, shrink)}
      />
      <div
        style={{
          position: "absolute",
          top: 720,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          opacity: prog(frame, 10, 8),
        }}
      >
        <div
          style={{
            width: 54,
            height: 68,
            backgroundColor: colors.orange,
            clipPath: "polygon(0 0, 70% 0, 100% 25%, 100% 100%, 0 100%)",
          }}
        />
        <div style={{ fontFamily: monoFamily, fontSize: 64, color: colors.white, minWidth: 1000 }}>
          {FILENAME.slice(0, typed)}
          <span style={{ opacity: caretOn ? 1 : 0, color: colors.orange }}>|</span>
        </div>
      </div>
      <div style={{ position: "absolute", top: 860, width: "100%" }}>
        <RevealWords
          words={[{ text: "Està" }, { text: "bé?", color: colors.orange }]}
          delay={68}
          stagger={5}
          style={{ justifyContent: "center", color: colors.white, fontSize: 72, fontWeight: 800 }}
        />
      </div>
    </AbsoluteFill>
  );
};
