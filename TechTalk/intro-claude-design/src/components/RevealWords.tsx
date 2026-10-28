import type { CSSProperties } from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT } from "../theme";

type Word = { text: string; color?: string };

// Each word rises out of its own mask, staggered.
export const RevealWords: React.FC<{
  words: Word[];
  delay?: number;
  stagger?: number;
  duration?: number;
  style?: CSSProperties;
}> = ({ words, delay = 0, stagger = 4, duration = 22, style }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.25em",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const start = delay + i * stagger;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: "0.08em",
              marginBottom: "-0.08em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: word.color,
                translate: interpolate(
                  frame,
                  [start, start + duration],
                  ["0px 110%", "0px 0%"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...EASE_OUT),
                  },
                ),
                rotate: interpolate(
                  frame,
                  [start, start + duration],
                  ["6deg", "0deg"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...EASE_OUT),
                  },
                ),
              }}
            >
              {word.text}
            </span>
          </span>
        );
      })}
    </div>
  );
};
