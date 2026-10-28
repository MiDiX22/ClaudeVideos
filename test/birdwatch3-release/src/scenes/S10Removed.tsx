import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { Punch, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

const Gone: React.FC<{ at: number; strikeAt: number; text: string; caption: string }> = ({ at, strikeAt, text, caption }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 14);
  const strike = prog(frame, strikeAt, 12, easeInOut);
  return (
    <div style={{ opacity: p * lerp(1, 0.45, strike), translate: `${lerp(80, 0, p)}px 0px` }}>
      <div style={{ position: "relative", display: "inline-block", fontSize: 96, fontWeight: 800, color: colors.white, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
        {text}
        <div style={{ position: "absolute", left: -10, right: -10, top: "52%", height: 12, backgroundColor: colors.orange, transformOrigin: "left center", scale: `${strike} 1` }} />
      </div>
      <div style={{ fontSize: 30, fontWeight: 600, color: colors.surface, marginTop: 6 }}>{caption}</div>
    </div>
  );
};

// "I diem adéu a…": what Birdwatch 3 drops, and Find your car coming back redesigned.
export const S10Removed: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("10-removed");
  const t = useCopy().removed;
  const tFind = at("find");
  const tBack = at("back");
  const unstrike = prog(frame, tBack, 14, easeInOut);
  const strike = prog(frame, tFind + 8, 10, easeInOut) * (1 - unstrike);
  const stamp = prog(frame, at("redesigned"), 12, overshoot);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="08" text={t.label} color={colors.white} accent={colors.orange} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 300, fontSize: Math.min(300, 1350 / t.bye.length), fontWeight: 800, color: colors.white, letterSpacing: "-0.06em", lineHeight: 1 }}>
        <Punch at={at("bye")}>{t.bye}</Punch>
      </div>
      <div style={{ position: "absolute", left: 1000, top: 210, display: "flex", flexDirection: "column", gap: 40 }}>
        <Gone at={at("smartrec") - 4} strikeAt={at("smartrec") + 14} text="SmartREC" caption={t.smartrec} />
        <Gone at={at("views") - 4} strikeAt={at("sql") + 8} text={t.sql} caption={t.sqlSub} />
        <Gone at={at("license") - 4} strikeAt={at("irw") + 8} text={t.irw} caption={t.irwSub} />
      </div>
      <div style={{ position: "absolute", left: 140, top: 760, display: "flex", alignItems: "center", gap: 46, opacity: prog(frame, tFind - 4, 10) }}>
        <div style={{ position: "relative", fontSize: 110, fontWeight: 800, color: colors.white, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
          Find your car
          <div style={{ position: "absolute", left: -10, right: -10, top: "52%", height: 12, backgroundColor: colors.ink, transformOrigin: "left center", scale: `${strike} 1` }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              backgroundColor: colors.orange,
              color: colors.white,
              fontSize: 46,
              fontWeight: 800,
              padding: "14px 30px",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              scale: String(frame < at("redesigned") ? 0 : lerp(2, 1, stamp)),
              rotate: `${lerp(-14, -3, stamp)}deg`,
            }}
          >
            {t.back}
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: colors.surface, opacity: prog(frame, at("next"), 10), paddingLeft: 10 }}>
            {t.next}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
