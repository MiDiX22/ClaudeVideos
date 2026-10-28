import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { colors, fontFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

// "Arriba Birdwatch tres." An orange square slams in carrying a giant 3.
export const S01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("01-intro");
  const t = useCopy().intro;
  const tArriba = at("arrives");
  const tName = at("name");
  const tThree = at("three");

  const block = prog(frame, tThree - 4, 14, overshoot);
  const shake = frame >= tThree + 6 && frame < tThree + 14 ? Math.sin(frame * 3) * (tThree + 14 - frame) : 0;
  const zoom = lerp(1, 1.05, prog(frame, tThree, 60, easeInOut));
  const letters = "BirdWatch".split("");

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: String(zoom),
          translate: `${shake}px 0px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
          <div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: colors.grey,
                opacity: prog(frame, tArriba, 10),
                translate: `0px ${lerp(30, 0, prog(frame, tArriba, 16))}px`,
              }}
            >
              {t.arrives}
            </div>
            <div style={{ display: "flex", fontSize: 230, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {letters.map((l, i) => {
                const p = prog(frame, tName + i * 1.6, 14);
                return (
                  <span key={i} style={{ display: "inline-block", overflow: "hidden", paddingBottom: 20 }}>
                    <span
                      style={{
                        display: "inline-block",
                        color: i < 4 ? colors.grey : colors.orange,
                        translate: `0px ${lerp(105, 0, p)}%`,
                      }}
                    >
                      {l}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
          <div
            style={{
              width: 330,
              height: 330,
              backgroundColor: colors.orange,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scale: String(frame < tThree - 4 ? 0 : lerp(3, 1, block)),
              rotate: `${lerp(-25, 0, block)}deg`,
              color: colors.white,
              fontSize: 330,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            <span style={{ translate: "0px -0.04em" }}>3</span>
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 18,
          width: `${prog(frame, tThree, 40, easeInOut) * 100}%`,
          backgroundColor: colors.orange,
        }}
      />
    </AbsoluteFill>
  );
};
