import { AbsoluteFill, useCurrentFrame } from "remotion";
import { lerp, overshoot, prog } from "../anim";
import { LockIcon, RestoreIcon, UsbIcon } from "../components/Icons";
import { Punch, Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useWordFrame } from "../voice";

const Card: React.FC<{
  at: number;
  tWord: number;
  icon: React.ReactNode;
  word: string;
  caption: string;
}> = ({ at, tWord, icon, word, caption }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 18, overshoot);
  return (
    <div
      style={{
        width: 500,
        height: 470,
        backgroundColor: "#353534",
        borderTop: `10px solid ${colors.orange}`,
        padding: "50px 46px",
        display: "flex",
        flexDirection: "column",
        gap: 26,
        opacity: prog(frame, at, 6),
        translate: `0px ${lerp(160, 0, p)}px`,
      }}
    >
      <div style={{ scale: String(prog(frame, at + 4, 14, overshoot)), transformOrigin: "left center", height: 110 }}>{icon}</div>
      <div style={{ fontSize: 96, fontWeight: 800, color: colors.white, letterSpacing: "-0.03em", lineHeight: 1 }}>
        <Punch at={tWord} from={1.8}>
          {word}
        </Punch>
      </div>
      <div style={{ fontSize: 34, fontWeight: 600, color: colors.surface, lineHeight: 1.3 }}>{caption}</div>
    </div>
  );
};

// "Més seguretat": TLS certificates, USB dongle protection and backups restored from the startup wizard.
export const S06Security: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useWordFrame("06-security");
  const lift = prog(frame, at("Importa") - 6, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="04" text="SEGURETAT" color={colors.surface} accent={colors.orange} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: lerp(330, 190, lift),
          fontSize: lerp(200, 110, lift),
          fontWeight: 800,
          color: colors.white,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        <Rise at={at("Més")}>Més</Rise> <Rise at={at("seguretat")} style={{ color: colors.orange }}>seguretat</Rise>
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 106,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: colors.white,
          padding: "8px 20px",
          border: `3px solid ${colors.grey}`,
          opacity: prog(frame, at("seguretat") + 10, 12),
        }}
      >
        LLICÈNCIA v3.1
      </div>
      <div style={{ position: "absolute", left: 140, top: 400, display: "flex", gap: 70 }}>
        <Card
          at={at("Importa")}
          tWord={at("TLS")}
          icon={<LockIcon size={110} color={colors.orange} />}
          word="TLS/SSL"
          caption="Certificats importats des d'Integrations"
        />
        <Card
          at={at("protegeix")}
          tWord={at("USB")}
          icon={<UsbIcon size={110} color={colors.orange} />}
          word="USB"
          caption="Protecció amb dongle per a sistemes sense llicència dongleless"
        />
        <Card
          at={at("restaura")}
          tWord={at("còpies")}
          icon={<RestoreIcon size={110} color={colors.orange} />}
          word="Backup"
          caption="Es restaura des de l'assistent d'inici"
        />
      </div>
    </AbsoluteFill>
  );
};
