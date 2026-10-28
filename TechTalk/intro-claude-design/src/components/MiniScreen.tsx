import { Img, staticFile } from "remotion";
import { colors, fontFamily, moduleColors } from "../theme";

export const SCREEN_W = 960;
export const SCREEN_H = 540;

const GROUPS: { label: string; tiles: string[] }[] = [
  { label: "EVENTS", tiles: ["Access events", "Spot stays", "Incidents"] },
  { label: "MAPS", tiles: ["Level 1", "Level 2"] },
  { label: "TOOLS", tiles: ["Vehicle review", "Camera browser", "Search"] },
];

const STATS = [
  { value: "87%", label: "Occupancy" },
  { value: "1.204", label: "Access events" },
  { value: "12", label: "Incidents" },
];

// A simplified BirdWatch-style screen; `variant` changes layout and tile colours.
export const MiniScreen: React.FC<{
  variant: number;
  children?: React.ReactNode;
}> = ({ variant, children }) => {
  const layout = variant % 3;
  const tile = (i: number) => moduleColors[(i + variant * 2) % moduleColors.length];

  return (
    <div
      style={{
        position: "relative",
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: colors.white,
        overflow: "hidden",
        fontFamily,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          borderBottom: "1px solid #e4e4e2",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: colors.grey }}>
          Bird<span style={{ color: colors.orange }}>Watch</span>
          <sup style={{ fontSize: 9 }}>®</sup>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: colors.orange }}>
          Parking
        </div>
        <Img src={staticFile("quercus-logo-grey.png")} style={{ height: 26 }} />
      </div>
      {/* Nav bar */}
      <div
        style={{
          height: 34,
          backgroundColor: colors.orange,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 18px",
          color: colors.white,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 16, height: 2, backgroundColor: colors.white }} />
          ))}
        </div>
        Home &gt; Parking
      </div>

      {layout === 0 ? (
        <div style={{ padding: "22px 32px" }}>
          {GROUPS.map((group, g) => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: colors.grey,
                  marginBottom: 8,
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {group.tiles.map((label, i) => (
                  <div
                    key={label}
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 6,
                      backgroundColor: tile(g * 3 + i),
                      color: colors.white,
                      fontSize: 13,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: 8,
                      boxSizing: "border-box",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {layout === 1 ? (
        <div style={{ display: "flex", height: SCREEN_H - 74 }}>
          <div
            style={{
              width: 200,
              backgroundColor: colors.surface,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[120, 90, 140, 100, 80, 110].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: i === 1 ? colors.orange : "#c9c9c7",
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              padding: 24,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {[0, 1, 2, 3].map((c) => (
              <div
                key={c}
                style={{
                  border: "1px solid #e4e4e2",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: colors.grey }}>
                  {["OCCUPANCY", "ACCESS EVENTS", "SPOT STAYS", "INCIDENTS"][c]}
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 10 }}>
                  {[40, 70, 55, 90, 65].map((h, b) => (
                    <div
                      key={b}
                      style={{
                        flex: 1,
                        height: `${(h + ((c * 17 + b * 11 + variant * 7) % 30)) * 0.9}%`,
                        backgroundColor: tile(c),
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {layout === 2 ? (
        <div style={{ display: "flex", gap: 24, padding: 24, height: SCREEN_H - 74, boxSizing: "border-box" }}>
          <div
            style={{
              position: "relative",
              flex: 1,
              backgroundColor: tile(1),
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.12) 2px, transparent 2px)",
              backgroundSize: "48px 48px",
            }}
          >
            {[
              [120, 90],
              [300, 160],
              [210, 280],
              [460, 120],
              [400, 310],
            ].map(([x, y], i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x + ((variant * 23) % 60),
                  top: y,
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: colors.orange,
                  border: "4px solid white",
                }}
              />
            ))}
          </div>
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 18 }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ borderLeft: `6px solid ${colors.orange}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: colors.ink, lineHeight: 1.1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 14, color: colors.grey }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {children}
    </div>
  );
};
