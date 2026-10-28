import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { BoltIcon, RebootIcon } from "../components/Icons";
import { Punch, Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily, success } from "../theme";
import { useWordFrame } from "../voice";

const Toggle: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 120, height: 64, borderRadius: 9999, backgroundColor: on > 0.5 ? success : "rgba(255,255,255,0.35)", position: "relative" }}>
    <div
      style={{
        position: "absolute",
        top: 7,
        left: lerp(7, 63, on),
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.white,
      }}
    />
  </div>
);

// "Els paràmetres se separen en dos": the frame splits into Dynamic (applied now) and Static (after reboot).
export const S05Settings: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useWordFrame("05-settings");
  const split = prog(frame, at("en") - 2, 20, easeInOut);
  const tDyn = at("dinàmics");
  const tStat = at("estàtics");
  const tReboot = at("reiniciar");
  const toggles = [0, 1, 2].map((i) => prog(frame, at("l'instant") + i * 4, 4));
  const spin = prog(frame, tReboot - 4, 30, easeInOut);
  const applied = prog(frame, tReboot + 24, 8, overshoot);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: lerp(0, 960, split), backgroundColor: colors.orange }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: lerp(0, 960, split), backgroundColor: colors.grey }} />
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="03" text="PARÀMETRES" color={split > 0.5 ? colors.white : colors.grey} accent={split > 0.5 ? colors.ink : colors.orange} />
      </div>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 170,
          fontWeight: 800,
          color: colors.ink,
          letterSpacing: "-0.04em",
          opacity: 1 - prog(frame, at("en"), 8),
          scale: String(lerp(1, 0.8, prog(frame, at("en"), 12))),
        }}
      >
        <div>
          <Rise at={at("Els")}>Paràmetres</Rise>
        </div>
      </AbsoluteFill>
      {[
        { left: 0, t: tDyn, title: "Dinàmics", sub: "s'apliquen a l'instant" },
        { left: 960, t: tStat, title: "Estàtics", sub: "després de reiniciar" },
      ].map((side, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: side.left,
            top: 300,
            width: 960,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            color: colors.white,
          }}
        >
          <div style={{ height: 150, display: "flex", alignItems: "center" }}>
            {i === 0 ? (
              <BoltIcon size={150} color={colors.white} style={{ scale: String(prog(frame, tDyn, 12, overshoot)) }} />
            ) : (
              <RebootIcon size={150} color={colors.white} style={{ scale: String(prog(frame, tStat, 12, overshoot)), rotate: `${spin * 720}deg` }} />
            )}
          </div>
          <div style={{ fontSize: 130, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            <Punch at={side.t}>{side.title}</Punch>
          </div>
          <div style={{ fontSize: 46, fontWeight: 600 }}>
            <Rise at={side.t + 22}>{side.sub}</Rise>
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 30, opacity: prog(frame, side.t + 10, 10) }}>
            {[0, 1, 2].map((k) => (
              <Toggle key={k} on={i === 0 ? toggles[k] : applied} />
            ))}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};
