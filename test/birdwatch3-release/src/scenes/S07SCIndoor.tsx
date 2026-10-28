import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { PinIcon } from "../components/Icons";
import { Punch, Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily, monoFamily, moduleColors } from "../theme";
import { useWordFrame } from "../voice";

const PLATES = [
  { country: "E", number: "4821 KJT" },
  { country: "F", number: "GH-512-PL" },
  { country: "D", number: "M-AB 4302" },
  { country: "I", number: "FR 318 YT" },
  { country: "P", number: "52-RT-19" },
  { country: "NL", number: "XK-821-B" },
];

const Plate: React.FC<{ country: string; number: string }> = ({ country, number }) => (
  <div style={{ display: "flex", height: 92, border: `4px solid ${colors.ink}`, borderRadius: 8, backgroundColor: colors.white, overflow: "hidden" }}>
    <div
      style={{
        width: 56,
        backgroundColor: "#003399",
        color: colors.white,
        fontSize: 26,
        fontWeight: 700,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 10,
      }}
    >
      {country}
    </div>
    <div style={{ padding: "0 28px", display: "flex", alignItems: "center", fontFamily: monoFamily, fontSize: 52, fontWeight: 700, color: colors.ink }}>
      {number}
    </div>
  </div>
);

// One segmented control: Birdwatch ("Internal") or the customer ("External") runs the service.
const Managed: React.FC<{ at: number; name: string; choice: 0 | 1 }> = ({ at, name, choice }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 16, overshoot);
  const pick = prog(frame, at + 14, 10, overshoot);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36, opacity: prog(frame, at, 6), translate: `${lerp(-60, 0, p)}px 0px` }}>
      <div style={{ width: 290, fontSize: 96, fontWeight: 800, color: colors.ink, letterSpacing: "-0.03em" }}>{name}</div>
      <div style={{ position: "relative", display: "flex", border: `3px solid ${colors.grey}`, fontSize: 34, fontWeight: 700 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${choice * 50}%`,
            width: "50%",
            backgroundColor: colors.orange,
            scale: String(pick),
          }}
        />
        {["Internal", "External"].map((label, i) => (
          <div key={label} style={{ position: "relative", width: 230, padding: "16px 0", textAlign: "center", color: i === choice && pick > 0.5 ? colors.white : colors.grey }}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// "SC Indoor passa a l'API cinc punt u": new API, SC Indoor AI docker, DNS/DHCP management and one location for plates.
export const S07SCIndoor: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useWordFrame("07-scindoor");
  const tRoll = at("cinc");
  const roll = prog(frame, tRoll, 14, easeInOut);
  const tAi = at("docker");
  const xpuOut = prog(frame, tAi, 12, easeInOut);
  const tB = at("Birdwatch") - 8;
  const swap = prog(frame, tB, 20, easeInOut);
  const tLoc = at("ubicació");
  const scroll = Math.max(0, frame - tLoc) * 5;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="05" text="SC INDOOR" color={colors.grey} accent={colors.orange} />
      </div>
      {/* Part A: API v5.1.0 and the SC Indoor AI docker. */}
      <AbsoluteFill style={{ translate: `0px ${lerp(0, -1080, swap)}px` }}>
        <div style={{ position: "absolute", left: 140, top: 250, fontSize: 210, fontWeight: 800, color: colors.ink, letterSpacing: "-0.05em", lineHeight: 1 }}>
          <Rise at={at("SC")}>SC</Rise> <Rise at={at("Indoor")} style={{ color: colors.orange }}>Indoor</Rise>
        </div>
        <div style={{ position: "absolute", left: 140, top: 540, display: "flex", alignItems: "center", gap: 30, opacity: prog(frame, at("l'API"), 10) }}>
          <div style={{ fontSize: 60, fontWeight: 700, color: colors.grey }}>API</div>
          <div style={{ fontSize: 150, fontWeight: 800, color: colors.ink, letterSpacing: "-0.03em", display: "flex" }}>
            v5.
            <span style={{ display: "inline-block", height: 160, overflow: "hidden", color: colors.orange }}>
              <span style={{ display: "flex", flexDirection: "column", translate: `0px ${-roll * 160}px`, lineHeight: "160px" }}>
                <span>0</span>
                <span>1</span>
              </span>
            </span>
            .0
          </div>
        </div>
        <div style={{ position: "absolute", left: 1150, top: 300, display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.2em", color: colors.grey, opacity: prog(frame, at("treballa"), 10) }}>TREBALLA AMB</div>
          <div style={{ position: "relative", fontSize: 64, fontWeight: 800, color: colors.grey, opacity: prog(frame, at("treballa"), 10) * lerp(1, 0.35, xpuOut) }}>
            XPU virtual machine
            <div style={{ position: "absolute", left: 0, top: "52%", height: 8, width: `${xpuOut * 100}%`, backgroundColor: colors.orange }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "28px 40px",
              backgroundColor: moduleColors[1],
              color: colors.white,
              fontSize: 78,
              fontWeight: 800,
              whiteSpace: "nowrap",
              scale: String(prog(frame, at("SC", 1), 16, overshoot)),
              transformOrigin: "left center",
            }}
          >
            SC Indoor <Punch at={at("AI")} style={{ color: colors.orange }}>AI</Punch>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.15em", padding: "6px 14px", border: `3px solid ${colors.white}` }}>DOCKER</span>
          </div>
        </div>
      </AbsoluteFill>
      {/* Part B: DNS/DHCP and plate recognition by location. */}
      <AbsoluteFill style={{ translate: `0px ${lerp(1080, 0, swap)}px` }}>
        <div style={{ position: "absolute", left: 140, top: 250, display: "flex", flexDirection: "column", gap: 60 }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "0.2em", color: colors.grey }}>
            <Rise at={at("gestionar")}>QUI GESTIONA LA XARXA?</Rise>
          </div>
          <Managed at={at("DNS")} name="DNS" choice={0} />
          <Managed at={at("DHCP")} name="DHCP" choice={1} />
        </div>
        <div style={{ position: "absolute", left: 1240, top: 230, width: 560, height: 720, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: prog(frame, tLoc, 10) }}>
            <PinIcon size={110} color={colors.orange} style={{ translate: `0px ${lerp(-80, 0, prog(frame, tLoc, 14, overshoot))}px` }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "0.2em", color: colors.grey }}>UNA SOLA UBICACIÓ</div>
              <div style={{ fontSize: 88, fontWeight: 800, color: colors.ink, letterSpacing: "-0.03em", lineHeight: 1.05 }}>Europa</div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: 200,
              left: 0,
              right: 0,
              bottom: 0,
              maskImage: "linear-gradient(transparent, black 18%, black 80%, transparent)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 26, translate: `0px ${380 - scroll}px` }}>
              {[...PLATES, ...PLATES].map((plate, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <Plate {...plate} />
                  <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#21ba45", opacity: frame > tLoc + 33 + i * 23.6 ? 1 : 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
