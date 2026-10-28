import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";
import { lerp, overshoot, prog } from "../anim";
import { WrenchIcon } from "../components/Icons";
import { Rise, SectionLabel, Typed } from "../components/Kinetic";
import { colors, fontFamily, monoFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

// An LED parking display; its text takes the configured colour (one of the 3.0.1 fixes).
const LedPanel: React.FC<{ at: number; tColor: number; free: string }> = ({ at, tColor, free }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 18, overshoot);
  const ink = interpolateColors(frame, [tColor, tColor + 8], [colors.white, colors.orange]);
  return (
    <div
      style={{
        width: 900,
        height: 330,
        backgroundColor: "#111",
        border: `14px solid #2b2b2a`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 60px",
        position: "relative",
        scale: String(p),
        opacity: prog(frame, at, 6),
      }}
    >
      <div style={{ fontSize: 180, fontWeight: 800, color: ink, fontFamily: monoFamily, lineHeight: 1 }}>P</div>
      <div style={{ textAlign: "right", color: ink, fontFamily: monoFamily, fontWeight: 700 }}>
        <div style={{ fontSize: 150, lineHeight: 1 }}>128</div>
        <div style={{ fontSize: 50, letterSpacing: "0.1em" }}>{free}</div>
      </div>
      {/* Dot-matrix grid on top of the text. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, transparent 2.6px, #111 3.4px)",
          backgroundSize: "9px 9px",
        }}
      />
    </div>
  );
};

// "Les pantalles de nova generació ja són compatibles amb les A1 d'Ampron", plus new diagnosis tools.
export const S08Displays: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("08-displays");
  const t = useCopy().displays;
  const tA1 = at("a1");
  const stamp = prog(frame, tA1, 12, overshoot);
  const tTools = at("newTools");

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="06" text={t.label} color={colors.white} accent={colors.orange} />
      </div>
      <div style={{ position: "absolute", left: 140, top: 230, fontSize: 104, fontWeight: 800, color: colors.white, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
        <Rise at={at("line1")}>{t.line1}</Rise>
        <br />
        <Rise at={at("line2")} style={{ color: colors.orange }}>
          {t.line2}
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 140, top: 520 }}>
        <LedPanel at={at("compatible") - 10} tColor={tA1 + 6} free={t.free} />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            backgroundColor: colors.orange,
            color: colors.white,
            fontSize: 54,
            fontWeight: 800,
            padding: "14px 30px",
            letterSpacing: "0.04em",
            scale: String(frame < tA1 ? 0 : lerp(2, 1, stamp)),
            rotate: `${lerp(-20, 6, stamp)}deg`,
          }}
        >
          A1 · Ampron
        </div>
      </div>
      <div style={{ position: "absolute", left: 1180, top: 300, width: 640, display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: prog(frame, tTools, 10) }}>
          <WrenchIcon size={72} color={colors.orange} />
          <div style={{ fontSize: 64, fontWeight: 800, color: colors.white, letterSpacing: "-0.02em" }}>
            <Rise at={at("tools")}>{t.tools}</Rise>
          </div>
        </div>
        {["SCIndoor-Occupancy-", "PlatelessPackage-256", "SCOutdoor-Occupancy-", "PicturesPackage"].map((t, i) => (
          <div key={t} style={{ fontFamily: monoFamily, fontSize: 36, color: i % 2 === 0 ? colors.surface : colors.orange, paddingLeft: i % 2 === 0 ? 0 : 40 }}>
            <Typed at={at("newTools") + 6 + i * 8} text={t} speed={2.4} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
