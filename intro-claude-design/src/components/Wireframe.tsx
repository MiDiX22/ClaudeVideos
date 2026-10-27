import { interpolate } from "remotion";
import { colors, fontFamily } from "../theme";

// A line-drawn screen whose orange button can be moved and resized.
export const Wireframe: React.FC<{
  draw: number;
  buttonX: number;
  buttonScale: number;
  width: number;
}> = ({ draw, buttonX, buttonScale, width }) => {
  const fill = interpolate(draw, [0.55, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outline = {
    fill: "none",
    stroke: colors.white,
    strokeWidth: 3,
    pathLength: 1,
    strokeDasharray: "1",
    strokeDashoffset: 1 - draw,
  };
  const bw = 180 * buttonScale;
  const bh = 60 * buttonScale;
  const bx = 60 + buttonX * (900 - 120 - bw);
  const by = 490 - bh;

  return (
    <svg
      viewBox="0 0 900 560"
      width={width}
      height={(width * 560) / 900}
      style={{ overflow: "visible" }}
    >
      <rect x={2} y={2} width={896} height={556} rx={14} {...outline} />
      <line x1={2} y1={64} x2={898} y2={64} {...outline} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={34 + i * 26} cy={33} r={8} {...outline} />
      ))}
      <rect
        x={60}
        y={110}
        width={360}
        height={40}
        rx={4}
        fill="rgba(255,255,255,0.85)"
        opacity={fill}
      />
      {[520, 460, 300].map((w, i) => (
        <rect
          key={i}
          x={60}
          y={180 + i * 30}
          width={w}
          height={14}
          rx={7}
          fill="rgba(255,255,255,0.25)"
          opacity={fill}
        />
      ))}
      <rect x={620} y={110} width={220} height={190} rx={6} {...outline} />
      <line x1={620} y1={110} x2={840} y2={300} {...outline} />
      <line x1={840} y1={110} x2={620} y2={300} {...outline} />
      <g opacity={fill}>
        <rect x={bx} y={by} width={bw} height={bh} rx={6} fill={colors.orange} />
        <text
          x={bx + bw / 2}
          y={by + bh / 2}
          fill={colors.white}
          fontSize={26 * buttonScale}
          fontWeight={700}
          fontFamily={fontFamily}
          textAnchor="middle"
          dominantBaseline="central"
        >
          Desa
        </text>
      </g>
    </svg>
  );
};
