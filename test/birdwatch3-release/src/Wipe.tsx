import { AbsoluteFill, useCurrentFrame } from "remotion";
import { easeInOut, lerp, prog } from "./anim";
import { colors } from "./theme";

export const WIPE = 16;

// A slanted orange band (with a grey trail) that crosses the frame, hiding the cut at its midpoint.
export const Wipe: React.FC = () => {
  const frame = useCurrentFrame();
  const p = prog(frame, 0, WIPE, easeInOut);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[
        { c: colors.grey, lag: 0.08 },
        { c: colors.orange, lag: 0 },
      ].map(({ c, lag }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: -400,
            height: 1880,
            width: 2300,
            left: lerp(-2700, 2500, Math.max(0, p - lag) / (1 - lag)),
            rotate: "14deg",
            backgroundColor: c,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
