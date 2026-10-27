import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, prog } from "../../anim";
import { RevealWords } from "../../components/RevealWords";
import { colors, fontFamily } from "../../theme";

export const LINE_Y = 640;

// "I si poguéssim sortir del bucle?" The ring flattens into a straight line.
export const S05Break: React.FC = () => {
  const frame = useCurrentFrame();
  const t = prog(frame, 58, 28, easeInOut);
  const appear = prog(frame, 0, 20);
  const rx = lerp(220, 1150, t);
  const ry = lerp(220, 0.01, t);
  const arc = lerp(0.82, 1, t) * appear;
  const textOut = prog(frame, 76, 14, easeInOut);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily }}>
      <svg width={1920} height={1080} style={{ position: "absolute", overflow: "visible" }}>
        <g transform={`translate(960 ${LINE_Y}) rotate(${frame * 8 * (1 - t)})`}>
          <ellipse
            rx={rx}
            ry={ry}
            fill="none"
            stroke={colors.orange}
            strokeWidth={12}
            pathLength={1}
            strokeDasharray={`${arc} 1`}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 150,
          width: "100%",
          opacity: 1 - textOut,
          translate: `0px ${-60 * textOut}px`,
        }}
      >
        <RevealWords
          words={[{ text: "I si" }, { text: "poguéssim" }]}
          delay={18}
          stagger={5}
          style={{ justifyContent: "center", color: colors.white, fontSize: 100, fontWeight: 800, letterSpacing: "-0.03em" }}
        />
        <RevealWords
          words={[{ text: "sortir" }, { text: "del" }, { text: "bucle?", color: colors.orange }]}
          delay={44}
          stagger={5}
          style={{ justifyContent: "center", color: colors.white, fontSize: 100, fontWeight: 800, letterSpacing: "-0.03em" }}
        />
      </div>
    </AbsoluteFill>
  );
};
