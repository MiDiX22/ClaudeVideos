import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { easeInOut, easeOut, lerp, overshoot, prog } from "../anim";
import { CheckIcon, RebootIcon } from "../components/Icons";
import { Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily, monoFamily, success } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

const Counter: React.FC<{ from: number; to: number; value: number; color: string; size: number }> = ({ from, to, value, color, size }) => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(frame, [from, to], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }));
  return (
    <div style={{ fontSize: size, fontWeight: 800, color, letterSpacing: "-0.05em", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>{n}</div>
  );
};

const Fixed: React.FC<{ at: number; title: string; children: React.ReactNode }> = ({ at, title, children }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 18, overshoot);
  return (
    <div
      style={{
        width: 780,
        height: 300,
        backgroundColor: colors.surface,
        padding: "36px 44px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        opacity: prog(frame, at, 6),
        translate: `0px ${lerp(120, 0, p)}px`,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.18em", color: colors.grey }}>{title}</div>
      {children}
    </div>
  );
};

const Done: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: success,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scale: String(prog(frame, at, 12, overshoot)),
      }}
    >
      <CheckIcon size={54} color={colors.white} />
    </div>
  );
};

// "En total, quaranta-set canvis. Setze errors corregits": counters, then two of the fixes shown.
export const S09Fixes: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("09-fixes");
  const t = useCopy().fixes;
  const tChanges = at("changes");
  const tBugs = at("bugs");
  const tToken = at("tokens");
  const tUrl = at("url");
  const hide = prog(frame, tUrl, 14, easeInOut);
  const tLoop = at("container");
  const tStop = at("stop");
  const spin = interpolate(frame, [tLoop, tStop + 6], [0, 1600], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - (1 - t) * (1 - t) });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="07" text={t.label} color={colors.grey} accent={colors.orange} />
      </div>
      <div style={{ position: "absolute", left: 140, top: 220, display: "flex", alignItems: "flex-end", gap: 34 }}>
        <Counter from={tChanges - 4} to={at("changesWord") + 6} value={47} color={colors.orange} size={300} />
        <div style={{ fontSize: 80, fontWeight: 800, color: colors.ink, paddingBottom: 26 }}>
          <Rise at={at("changesWord")}>{t.changes}</Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: 1010, top: 220, display: "flex", alignItems: "flex-end", gap: 30, opacity: prog(frame, tBugs - 2, 6) }}>
        <Counter from={tBugs - 2} to={at("fixedWord") + 4} value={16} color={colors.grey} size={300} />
        <div style={{ fontSize: 62, fontWeight: 800, color: colors.ink, lineHeight: 1.05, paddingBottom: 26 }}>
          <Rise at={at("errorsWord")}>{t.bugs}</Rise>
          <br />
          <Rise at={at("fixedWord")}>{t.fixed}</Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: 140, top: 640, display: "flex", gap: 80 }}>
        <Fixed at={tToken - 6} title={t.token}>
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div
              style={{
                flex: 1,
                height: 84,
                backgroundColor: colors.white,
                border: "3px solid #dededf",
                borderRadius: 42,
                display: "flex",
                alignItems: "center",
                padding: "0 30px",
                fontFamily: monoFamily,
                fontSize: 34,
                color: colors.ink,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              /birdwatch/
              <span
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  maxWidth: lerp(420, 0, hide),
                  color: "#db2828",
                  opacity: 1 - hide,
                }}
              >
                ?token=eyJhbGci…
              </span>
            </div>
            <Done at={tUrl + 12} />
          </div>
        </Fixed>
        <Fixed at={tLoop - 6} title={t.loop}>
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <RebootIcon size={110} color={frame > tStop + 6 ? colors.grey : "#db2828"} style={{ rotate: `${spin}deg` }} />
            <div style={{ flex: 1, fontSize: 40, fontWeight: 700, color: colors.ink }}>
              {frame > tStop + 6 ? t.stops : t.restarting}
            </div>
            <Done at={tStop + 8} />
          </div>
        </Fixed>
      </div>
    </AbsoluteFill>
  );
};
