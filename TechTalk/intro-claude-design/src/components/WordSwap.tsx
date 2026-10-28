import type { CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import { easeInOut, prog } from "../anim";

type Item = { at: number; lines: string[]; color?: string };

// Shows one item at a time; each line rises in from its own mask and leaves upwards.
export const WordSwap: React.FC<{
  items: Item[];
  end: number;
  style?: CSSProperties;
}> = ({ items, end, style }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", ...style }}>
      {items.map((item, i) => {
        const next = i < items.length - 1 ? items[i + 1].at : end;
        if (frame < item.at - 1 || frame > next + 14) {
          return null;
        }
        const out = i < items.length - 1 ? prog(frame, next, 12, easeInOut) : 0;
        return (
          <div
            key={i}
            style={{ position: "absolute", left: 0, top: 0, translate: "0px -50%" }}
          >
            {item.lines.map((line, j) => {
              const enter = prog(frame, item.at + j * 3, 18);
              return (
                <div
                  key={j}
                  style={{
                    overflow: "hidden",
                    paddingBottom: "0.12em",
                    marginBottom: "-0.12em",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      color: item.color,
                      translate: `0px ${(1 - enter) * 115 - out * 115}%`,
                    }}
                  >
                    {line}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
