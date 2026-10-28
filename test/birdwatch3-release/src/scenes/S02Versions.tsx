import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { Rise } from "../components/Kinetic";
import { colors, fontFamily, success } from "../theme";
import { useWordFrame } from "../voice";

const LINE_Y = 640;

const Release: React.FC<{
  x: number;
  tVersion: number;
  tStage: number;
  tDate: number;
  version: string;
  stage: string;
  stageColor: string;
  date: string;
}> = ({ x, tVersion, tStage, tDate, version, stage, stageColor, date }) => {
  const frame = useCurrentFrame();
  const dot = prog(frame, tVersion - 4, 12, overshoot);
  const stamp = prog(frame, tStage, 10, overshoot);
  return (
    <div style={{ position: "absolute", left: x, top: 0, width: 0, height: 1080 }}>
      <div
        style={{
          position: "absolute",
          left: -22,
          top: LINE_Y - 22,
          width: 44,
          height: 44,
          backgroundColor: colors.orange,
          border: `8px solid ${colors.grey}`,
          boxSizing: "border-box",
          scale: String(dot),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -300,
          width: 600,
          top: LINE_Y - 300,
          textAlign: "center",
          fontSize: 190,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: colors.white,
          lineHeight: 1,
        }}
      >
        <Rise at={tVersion} duration={16}>
          {version}
        </Rise>
      </div>
      <div
        style={{
          position: "absolute",
          left: -300,
          width: 600,
          top: LINE_Y + 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            padding: "10px 30px",
            border: `4px solid ${stageColor}`,
            color: stageColor,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "0.2em",
            scale: String(frame < tStage ? 0 : lerp(1.8, 1, stamp)),
            rotate: `${lerp(-12, -4, stamp)}deg`,
            opacity: prog(frame, tStage, 4),
          }}
        >
          {stage}
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, color: colors.surface, letterSpacing: "0.12em" }}>
          <Rise at={tDate}>{date}</Rise>
        </div>
      </div>
    </div>
  );
};

// "Dues versions": a timeline with 3.0.0 Alpha (September) and 3.0.1 Beta (October).
export const S02Versions: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useWordFrame("02-versions");
  const line = prog(frame, at("versions"), 40, easeInOut);
  const drift = lerp(30, -30, prog(frame, 0, 380, (t) => t));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.grey, fontFamily, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 120,
          fontSize: 96,
          fontWeight: 800,
          color: colors.white,
          letterSpacing: "-0.02em",
          display: "flex",
          gap: 28,
        }}
      >
        <Rise at={at("Dues")}>Dues</Rise>
        <Rise at={at("versions")} style={{ color: colors.orange }}>
          versions
        </Rise>
      </div>
      <AbsoluteFill style={{ translate: `${drift}px 0px` }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: LINE_Y - 3,
            height: 6,
            width: line * 1920,
            backgroundColor: colors.surface,
            opacity: 0.5,
          }}
        />
        <Release
          x={600}
          tVersion={at("tres", 0)}
          tStage={at("alfa")}
          tDate={at("setembre")}
          version="3.0.0"
          stage="ALPHA"
          stageColor={colors.orange}
          date="15 SET 2026"
        />
        <Release
          x={1340}
          tVersion={at("tres", 1)}
          tStage={at("beta")}
          tDate={at("l'octubre")}
          version="3.0.1"
          stage="BETA"
          stageColor={success}
          date="15 OCT 2026"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
