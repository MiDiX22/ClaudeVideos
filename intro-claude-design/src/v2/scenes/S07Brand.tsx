import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { easeInOut, lerp, overshoot, prog } from "../../anim";
import { RevealWords } from "../../components/RevealWords";
import { colors, fontFamily } from "../../theme";

const CARD_W = 360;
const CARD_H = 420;

const Card: React.FC<{
  index: number;
  at: number;
  label: string;
  background: string;
  children: React.ReactNode;
}> = ({ index, at, label, background, children }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, at, 22, overshoot);
  const fade = prog(frame, at, 8);

  return (
    <div
      style={{
        position: "absolute",
        left: 180 + index * (CARD_W + 40),
        top: 330,
        width: CARD_W,
        opacity: fade,
        translate: `0px ${lerp(220, 0, t)}px`,
        rotate: `${lerp(index % 2 === 0 ? -10 : 10, 0, t)}deg`,
      }}
    >
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          backgroundColor: background,
          boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "0.25em",
          color: colors.grey,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const SWATCHES = [colors.orange, colors.grey, colors.ink, colors.surface];

// "Parteix de la nostra marca: colors, tipografia, components…"
export const S07Brand: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = prog(frame, 0, 20, easeInOut);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.orange, fontFamily }}>
      <AbsoluteFill
        style={{
          backgroundColor: colors.white,
          clipPath: `circle(${reveal * 1200}px at 50% 50%)`,
        }}
      >
        <div style={{ position: "absolute", left: 180, top: 130 }}>
          <RevealWords
            words={[
              { text: "Parteix" },
              { text: "de" },
              { text: "la" },
              { text: "nostra" },
              { text: "marca", color: colors.orange },
            ]}
            delay={10}
            stagger={3}
            style={{ color: colors.ink, fontSize: 92, fontWeight: 800, letterSpacing: "-0.03em" }}
          />
        </div>
        <Card index={0} at={22} label="LOGO" background={colors.surface}>
          <Img src={staticFile("quercus-logo-grey.png")} style={{ width: 290 }} />
        </Card>
        <Card index={1} at={50} label="COLORS" background={colors.white}>
          <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
            {SWATCHES.map((color, i) => (
              <div
                key={color}
                style={{
                  flex: 1,
                  backgroundColor: color,
                  scale: `${prog(frame, 56 + i * 4, 18)} 1`,
                  transformOrigin: "left center",
                }}
              />
            ))}
          </div>
        </Card>
        <Card index={2} at={76} label="TIPOGRAFIA" background={colors.ink}>
          <div style={{ color: colors.white, fontSize: 190, fontWeight: 800, lineHeight: 1 }}>
            A<span style={{ color: colors.orange, fontWeight: 400 }}>a</span>
          </div>
          <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, marginTop: 16 }}>
            Open Sans
          </div>
        </Card>
        <Card index={3} at={104} label="COMPONENTS" background={colors.surface}>
          <div
            style={{
              backgroundColor: colors.orange,
              color: colors.white,
              fontSize: 30,
              fontWeight: 700,
              borderRadius: 4,
              padding: "14px 64px",
              marginBottom: 34,
            }}
          >
            Login
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["#0f4475", "#d32f2e"].map((c, i) => (
              <div
                key={c}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 6,
                  backgroundColor: c,
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 10,
                  boxSizing: "border-box",
                }}
              >
                {["Level 1", "Search"][i]}
              </div>
            ))}
          </div>
        </Card>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
