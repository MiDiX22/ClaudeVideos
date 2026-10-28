import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { easeInOut, lerp, prog } from "../anim";
import { Rise } from "../components/Kinetic";
import { colors, fontFamily } from "../theme";
import { useCopy } from "../copy";
import { useCue } from "../voice";

// "Birdwatch tres. Més net, més segur i més fàcil de mantenir." Then the Quercus sign-off.
export const S11Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const at = useCue("11-outro");
  const copy = useCopy().outro;
  const tEnd = at("maintain") + 34;
  const band = prog(frame, tEnd, 24, easeInOut);
  const lines = [at("more1"), at("more2"), at("more3")].map((start, i) => ({ t: start, ...copy.lines[i] }));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily, overflow: "hidden" }}>
      <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center", translate: `${lerp(0, -300, band)}px 0px`, opacity: 1 - band }}>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 30 }}>
          <Rise at={at("name")}>
            <span style={{ color: colors.grey }}>Bird</span>
            <span style={{ color: colors.orange }}>Watch</span>
            <span style={{ color: colors.grey }}> 3</span>
          </Rise>
        </div>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 150, fontWeight: 800, color: colors.ink, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
            {l.a && (
              <>
                <Rise at={l.t}>{l.a}</Rise>{" "}
              </>
            )}
            <Rise at={l.a ? l.t + 8 : l.t} style={{ color: colors.orange }}>
              {l.b}
            </Rise>
          </div>
        ))}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: -300,
          width: 2520,
          top: 300,
          height: 480,
          rotate: "-6deg",
          transformOrigin: "left center",
          scale: `${band} 1`,
          backgroundColor: colors.grey,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -300,
          width: 2520,
          top: 760,
          height: 70,
          rotate: "-6deg",
          transformOrigin: "left center",
          scale: `${prog(frame, tEnd + 6, 24, easeInOut)} 1`,
          backgroundColor: colors.orange,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40, opacity: prog(frame, tEnd + 16, 16), translate: `0px ${lerp(30, 0, prog(frame, tEnd + 16, 20))}px` }}>
        <Img src={staticFile("quercus-logo-white.png")} style={{ height: 150 }} />
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "0.2em", color: colors.white }}>BIRDWATCH 3 · v3.0.1 BETA</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
