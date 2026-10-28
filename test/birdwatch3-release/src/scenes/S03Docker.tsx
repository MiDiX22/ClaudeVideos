import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../anim";
import { Punch, Rise, SectionLabel, Typed } from "../components/Kinetic";
import { colors, fontFamily, monoFamily, moduleColors } from "../theme";
import { useWordFrame } from "../voice";

const Row: React.FC<{ at: number; title: string; children: React.ReactNode }> = ({ at, title, children }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 18);
  return (
    <div style={{ opacity: p, translate: `${lerp(80, 0, p)}px 0px`, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.2em", color: colors.grey }}>{title}</div>
      {children}
    </div>
  );
};

// Stacked container blocks that drop in one by one.
const Containers: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const blocks = [
    { x: 0, y: 2, c: colors.orange },
    { x: 1, y: 2, c: colors.grey },
    { x: 2, y: 2, c: colors.orange },
    { x: 0.5, y: 1, c: moduleColors[5] },
    { x: 1.5, y: 1, c: colors.orange },
    { x: 1, y: 0, c: colors.grey },
  ];
  return (
    <div style={{ position: "relative", width: 3 * 120, height: 3 * 84 }}>
      {blocks.map((b, i) => {
        const p = prog(frame, at + i * 3, 12, overshoot);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x * 120 + 4,
              top: b.y * 84 + 4 - lerp(300, 0, p),
              width: 112,
              height: 76,
              backgroundColor: b.c,
              opacity: prog(frame, at + i * 3, 4),
              backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 6px, transparent 6px 22px)",
            }}
          />
        );
      })}
    </div>
  );
};

// "Birdwatch tres funciona amb Docker": install path, RAM limit and the optional WebDAV service.
export const S03Docker: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useWordFrame("03-docker");
  const tRam = at("limitar");
  const fill = prog(frame, tRam + 4, 30, easeInOut);
  const capped = prog(frame, at("RAM") + 4, 16, easeInOut);
  const ram = lerp(fill * 0.95, 0.6, capped);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 140, top: 110 }}>
        <SectionLabel at={0} index="01" text="DOCKER" color={colors.grey} accent={colors.orange} />
      </div>
      <div style={{ position: "absolute", left: 140, top: 250, display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ fontSize: 76, fontWeight: 800, color: colors.ink, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          <Rise at={at("Birdwatch")}>Birdwatch 3</Rise>
          <br />
          <Rise at={at("funciona")}>funciona amb</Rise>
        </div>
        <div style={{ fontSize: 200, fontWeight: 800, color: colors.orange, lineHeight: 1, letterSpacing: "-0.04em" }}>
          <Punch at={at("Docker")}>Docker</Punch>
        </div>
        <Containers at={at("Docker") + 6} />
      </div>
      <div style={{ position: "absolute", left: 1010, top: 250, width: 770, display: "flex", flexDirection: "column", gap: 58 }}>
        <Row at={at("S'instal·la")} title="INSTAL·LACIÓ">
          <div
            style={{
              backgroundColor: colors.ink,
              color: colors.white,
              fontFamily: monoFamily,
              fontSize: 40,
              padding: "26px 32px",
            }}
          >
            <span style={{ color: colors.orange }}>$ </span>
            <Typed at={at("carpeta")} text="/opt/quercus/birdwatch3" speed={1} caretColor={colors.orange} />
          </div>
        </Row>
        <Row at={tRam} title="MEMÒRIA RAM">
          <div style={{ fontFamily: monoFamily, fontSize: 36, color: colors.ink }}>
            BW3_MEMORY_LIMIT=<span style={{ color: colors.orange, opacity: capped }}>6g</span>
          </div>
          <div style={{ position: "relative", height: 34, backgroundColor: colors.surface }}>
            <div style={{ height: "100%", width: `${ram * 100}%`, backgroundColor: capped > 0.5 ? colors.orange : colors.grey }} />
            <div
              style={{
                position: "absolute",
                left: "60%",
                top: -12,
                bottom: -12,
                width: 6,
                backgroundColor: colors.ink,
                scale: `1 ${capped}`,
              }}
            />
          </div>
        </Row>
        <Row at={at("pàrquings")} title="PÀRQUINGS PETITS">
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: colors.ink, letterSpacing: "-0.02em" }}>
              <Punch at={at("WebDAV")} from={1.8}>
                WebDAV
              </Punch>
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                padding: "8px 20px",
                border: `3px solid ${colors.orange}`,
                color: colors.orange,
                letterSpacing: "0.1em",
                opacity: prog(frame, at("opcional"), 8),
                scale: String(lerp(1.4, 1, prog(frame, at("opcional"), 10, overshoot))),
              }}
            >
              OPCIONAL
            </div>
          </div>
        </Row>
      </div>
    </AbsoluteFill>
  );
};
