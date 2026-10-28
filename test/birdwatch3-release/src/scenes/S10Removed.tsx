import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { Punch, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useWordFrame } from "../voice";

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
  const at = useWordFrame("10-removed");
  const tFind = at("Find");
  const tBack = at("tornarà");
  const unstrike = prog(frame, tBack, 14, easeInOut);
  const strike = prog(frame, tFind + 8, 10, easeInOut) * (1 - unstrike);
  const stamp = prog(frame, at("redissenyat"), 12, overshoot);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="08" text="ES RETIRA" color={colors.white} accent={colors.orange} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 300, fontSize: 300, fontWeight: 800, color: colors.white, letterSpacing: "-0.06em", lineHeight: 1 }}>
        <Punch at={at("adéu")}>Adéu</Punch>
      </div>
      <div style={{ position: "absolute", left: 1000, top: 210, display: "flex", flexDirection: "column", gap: 40 }}>
        <Gone at={at("SmartREC") - 4} strikeAt={at("SmartREC") + 14} text="SmartREC" caption="Hikvision és l'únic CCTV compatible" />
        <Gone at={at("vistes") - 4} strikeAt={at("SQL") + 8} text="Vistes SQL" caption="Les vistes públiques de només lectura" />
        <Gone at={at("llicència") - 4} strikeAt={at("IRW") + 8} text="Llicència IRW" caption="Retirada de les llicències de programari" />
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
              scale: String(frame < at("redissenyat") ? 0 : lerp(2, 1, stamp)),
              rotate: `${lerp(-14, -3, stamp)}deg`,
            }}
          >
            TORNARÀ REDISSENYAT
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: colors.surface, opacity: prog(frame, at("propera"), 10), paddingLeft: 10 }}>
            en una propera versió
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
