import { colors } from "../theme";

// An open orange ring with an arrowhead: the "bucle".
export const LoopRing: React.FC<{
  cx: number;
  cy: number;
  radius: number;
  draw: number;
  rotation: number;
  strokeWidth?: number;
  arc?: number;
  opacity?: number;
  scale?: number;
}> = ({
  cx,
  cy,
  radius,
  draw,
  rotation,
  strokeWidth = 12,
  arc = 0.82,
  opacity = 1,
  scale = 1,
}) => {
  const size = radius * 2 + 100;
  const c = size / 2;
  const length = arc * draw;
  const angle = length * 2 * Math.PI;

  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: cx - c,
        top: cy - c,
        overflow: "visible",
        opacity,
        rotate: `${rotation}deg`,
        scale: String(scale),
      }}
    >
      <circle
        cx={c}
        cy={c}
        r={radius}
        fill="none"
        stroke={colors.orange}
        strokeWidth={strokeWidth}
        pathLength={1}
        strokeDasharray={`${length} 1`}
      />
      {draw > 0.02 ? (
        <polygon
          points="-24,-22 24,0 -24,22"
          fill={colors.orange}
          transform={`translate(${c + radius * Math.cos(angle)} ${
            c + radius * Math.sin(angle)
          }) rotate(${(angle * 180) / Math.PI + 90})`}
        />
      ) : null}
    </svg>
  );
};
