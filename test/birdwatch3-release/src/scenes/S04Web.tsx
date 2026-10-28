import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { Punch, Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

const Tab: React.FC<{ label: string; active?: boolean; style?: React.CSSProperties }> = ({ label, active, style }) => (
  <div
    style={{
      padding: "18px 34px",
      fontSize: 34,
      fontWeight: 700,
      backgroundColor: active ? colors.orange : colors.white,
      color: active ? colors.white : colors.grey,
      border: `3px solid ${active ? colors.orange : "#d4d4d5"}`,
      borderRadius: 4,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {label}
  </div>
);

// "La web es renova": the website gets cleaner, System information opens faster and absorbs Maintenance.
export const S04Web: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("04-web");
  const t = useCopy().web;
  const tWin = at("window");
  const win = prog(frame, tWin, 20, overshoot);
  const tFast = at("fast");
  const load = prog(frame, tFast - 6, 8, easeInOut);
  const tMerge = at("maintenance");
  const merge = prog(frame, tMerge - 10, 18, easeInOut);
  const pulse = prog(frame, tMerge + 8, 10, overshoot);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.orange, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="02" text={t.label} color={colors.white} accent={colors.grey} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 230,
          fontSize: t.size,
          fontWeight: 800,
          color: colors.white,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        <Rise at={at("line1")}>{t.line1}</Rise>
        <br />
        <Rise at={at("line2")}>{t.line2}</Rise> <Punch at={at("renew")} style={{ color: colors.grey }}>{t.renew}</Punch>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 640,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          fontSize: 54,
          fontWeight: 700,
          color: colors.white,
        }}
      >
        <Rise at={at("cleaner")}>{t.bullets[0]}</Rise>
        <Rise at={tFast - 4}>{t.bullets[1]}</Rise>
        <Rise at={at("includes")}>{t.bullets[2]}</Rise>
      </div>
      {/* Browser window with the refreshed System information page. */}
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 220,
          width: 800,
          height: 640,
          backgroundColor: colors.white,
          boxShadow: "0 30px 60px rgba(43,43,42,0.25)",
          scale: String(frame < tWin ? 0 : lerp(0.6, 1, win)),
          opacity: prog(frame, tWin, 6),
          rotate: `${lerp(6, 0, win)}deg`,
        }}
      >
        <div style={{ height: 56, backgroundColor: colors.surface, display: "flex", alignItems: "center", gap: 12, paddingLeft: 24 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: "#c7c7c7" }} />
          ))}
        </div>
        <div style={{ height: 12, backgroundColor: colors.orange, width: `${load * 100}%` }} />
        <div style={{ padding: "40px 48px", display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ position: "relative", height: 90 }}>
            <Tab
              label="Maintenance"
              style={{
                position: "absolute",
                left: lerp(390, 0, merge),
                opacity: 1 - merge,
                scale: String(lerp(1, 0.7, merge)),
              }}
            />
            <Tab label="System information" active style={{ position: "absolute", left: 0, scale: String(lerp(1, 1.06, pulse) - lerp(0, 0.06, prog(frame, tMerge + 18, 10))) }} />
          </div>
          {[0.9, 0.7, 0.8, 0.55].map((w, i) => {
            const p = prog(frame, tFast + i * 2, 8);
            return (
              <div key={i} style={{ display: "flex", gap: 24, opacity: p }}>
                <div style={{ width: 160, height: 26, backgroundColor: colors.surface }} />
                <div style={{ width: 420 * w, height: 26, backgroundColor: i === 1 ? colors.orange : "#dededf" }} />
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {[0, 1, 2].map((i) => {
              const p = prog(frame, tFast + 6 + i * 3, 10, overshoot);
              return (
                <div
                  key={i}
                  style={{
                    width: 200,
                    height: 150,
                    border: `3px solid ${colors.surface}`,
                    scale: String(p),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg width={110} height={110} viewBox="0 0 36 36">
                    <circle cx={18} cy={18} r={14} fill="none" stroke={colors.surface} strokeWidth={5} />
                    <circle
                      cx={18}
                      cy={18}
                      r={14}
                      fill="none"
                      stroke={i === 2 ? colors.orange : "#009900"}
                      strokeWidth={5}
                      strokeDasharray={`${88 * [0.7, 0.45, 0.85][i] * p} 88`}
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
