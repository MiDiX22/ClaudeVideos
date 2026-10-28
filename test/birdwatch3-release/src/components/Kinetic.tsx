import type { CSSProperties, ReactNode } from "react";
import { useCurrentFrame } from "remotion";
import { lerp, overshoot, prog } from "../anim";

// A word that rises out of its own mask at frame `at`.
export const Rise: React.FC<{
  at: number;
  children: ReactNode;
  duration?: number;
  style?: CSSProperties;
}> = ({ at, children, duration = 14, style }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, duration);
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        paddingBottom: "0.1em",
        marginBottom: "-0.1em",
        verticalAlign: "bottom",
      }}
    >
      <span
        style={{
          display: "inline-block",
          translate: `0px ${lerp(110, 0, p)}%`,
          rotate: `${lerp(5, 0, p)}deg`,
          ...style,
        }}
      >
        {children}
      </span>
    </span>
  );
};

// A word that punches in from big to its size, with a little overshoot.
export const Punch: React.FC<{
  at: number;
  children: ReactNode;
  from?: number;
  style?: CSSProperties;
}> = ({ at, children, from = 2.4, style }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 12, overshoot);
  return (
    <span
      style={{
        display: "inline-block",
        scale: String(frame < at ? 0 : lerp(from, 1, p)),
        opacity: prog(frame, at, 4),
        filter: `blur(${lerp(12, 0, prog(frame, at, 8))}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// Letters typed one by one from frame `at`, with a blinking caret while typing.
export const Typed: React.FC<{
  at: number;
  text: string;
  speed?: number;
  caretColor?: string;
  style?: CSSProperties;
}> = ({ at, text, speed = 1.2, caretColor = "currentColor", style }) => {
  const frame = useCurrentFrame();
  const count = Math.max(0, Math.min(text.length, Math.floor((frame - at) * speed)));
  const typing = frame >= at && count < text.length + 6;
  return (
    <span style={{ whiteSpace: "pre", ...style }}>
      {text.slice(0, count)}
      <span
        style={{
          display: "inline-block",
          width: "0.55em",
          height: "1em",
          marginLeft: "0.05em",
          verticalAlign: "-0.12em",
          backgroundColor: caretColor,
          opacity: typing && Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
        }}
      />
    </span>
  );
};

// Uppercase tracked label with a number, like the brand book section heads.
export const SectionLabel: React.FC<{
  at: number;
  index: string;
  text: string;
  color: string;
  accent: string;
}> = ({ at, index, text, color, accent }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, at, 16);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: "0.24em",
        color,
        opacity: p,
        translate: `${lerp(-40, 0, p)}px 0px`,
      }}
    >
      <span style={{ color: accent }}>{index}</span>
      <span style={{ width: lerp(0, 70, p), height: 4, backgroundColor: accent }} />
      <span>{text}</span>
    </div>
  );
};
