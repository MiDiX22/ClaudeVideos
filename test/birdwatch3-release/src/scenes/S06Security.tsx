import { AbsoluteFill, useCurrentFrame } from "remotion";
import { lerp, overshoot, prog } from "../anim";
import { LockIcon, RestoreIcon, UsbIcon } from "../components/Icons";
import { Punch, Rise, SectionLabel } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

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
  const at = useCue("06-security");
  const t = useCopy().security;
  const lift = prog(frame, at("import") - 6, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="04" text={t.label} color={colors.surface} accent={colors.orange} />
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
        <Rise at={at("more")}>{t.more}</Rise> <Rise at={at("security")} style={{ color: colors.orange }}>{t.security}</Rise>
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
          opacity: prog(frame, at("security") + 10, 12),
        }}
      >
        {t.license}
      </div>
      <div style={{ position: "absolute", left: 140, top: 400, display: "flex", gap: 70 }}>
        <Card
          at={at("import")}
          tWord={at("tls")}
          icon={<LockIcon size={110} color={colors.orange} />}
          word="TLS/SSL"
          caption={t.tls}
        />
        <Card
          at={at("protect")}
          tWord={at("usb")}
          icon={<UsbIcon size={110} color={colors.orange} />}
          word="USB"
          caption={t.usb}
        />
        <Card
          at={at("restore")}
          tWord={at("backups")}
          icon={<RestoreIcon size={110} color={colors.orange} />}
          word="Backup"
          caption={t.backup}
        />
      </div>
    </AbsoluteFill>
  );
};
