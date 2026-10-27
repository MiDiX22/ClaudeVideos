import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT } from "../theme";

// The brand book's slanted colour band, sweeping in from the left.
export const SlantedBand: React.FC<{
  color: string;
  top: number;
  height: number;
  delay?: number;
  duration?: number;
  angle?: number;
}> = ({ color, top, height, delay = 0, duration = 26, angle = -8 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: -400,
        width: 2720,
        top,
        height,
        rotate: `${angle}deg`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color,
          transformOrigin: "left center",
          scale: interpolate(frame, [delay, delay + duration], ["0 1", "1 1"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...EASE_OUT),
          }),
        }}
      />
    </div>
  );
};
