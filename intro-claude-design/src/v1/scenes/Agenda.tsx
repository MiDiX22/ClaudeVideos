import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { RevealWords } from "../../components/RevealWords";
import { colors, EASE_OUT, fontFamily } from "../../theme";

const ITEMS = [
  "Sistemes de disseny de marca",
  "Prototips i pantalles en minuts",
  "Del disseny al codi",
];

const SWATCHES = [
  { color: colors.orange, label: "#EF7911", ink: colors.white },
  { color: colors.grey, label: "#575756", ink: colors.white },
  { color: colors.surface, label: "Aa · Open Sans", ink: colors.ink },
];

export const Agenda: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily }}>
      {/* Left: what the talk covers */}
      <div style={{ position: "absolute", left: 160, top: 210, width: 1000 }}>
        <div
          style={{
            color: colors.grey,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.3em",
            marginBottom: 18,
            opacity: interpolate(frame, [6, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          A LA XERRADA
        </div>
        <RevealWords
          words={[{ text: "Què" }, { text: "veurem", color: colors.orange }]}
          delay={8}
          style={{
            color: colors.ink,
            fontSize: 110,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 56,
          }}
        />
        {ITEMS.map((item, i) => {
          const start = 30 + i * 18;
          return (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                marginBottom: 34,
                opacity: interpolate(frame, [start, start + 14], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(
                  frame,
                  [start, start + 26],
                  ["-80px 0px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...EASE_OUT),
                  },
                ),
              }}
            >
              <div
                style={{
                  width: 88,
                  height: 88,
                  flexShrink: 0,
                  backgroundColor: colors.orange,
                  color: colors.white,
                  fontSize: 38,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {`0${i + 1}`}
              </div>
              <div
                style={{
                  color: colors.ink,
                  fontSize: 50,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: a design system assembling itself */}
      <div
        style={{
          position: "absolute",
          right: 160,
          top: 200,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {SWATCHES.map((swatch, i) => {
          const start = 40 + i * 10;
          return (
            <div
              key={swatch.label}
              style={{
                width: 440,
                height: 200,
                backgroundColor: swatch.color,
                color: swatch.ink,
                display: "flex",
                alignItems: "flex-end",
                padding: 28,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "0.08em",
                transformOrigin: "right center",
                scale: interpolate(frame, [start, start + 24], ["0 1", "1 1"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(...EASE_OUT),
                }),
              }}
            >
              <span
                style={{
                  opacity: interpolate(
                    frame,
                    [start + 18, start + 30],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ),
                }}
              >
                {swatch.label}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
