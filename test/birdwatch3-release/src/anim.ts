import { Easing, interpolate } from "remotion";

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.55, 0, 1, 0.45);
export const overshoot = Easing.bezier(0.34, 1.56, 0.64, 1);
export const linear = (t: number) => t;

// 0 → 1 progress of an animation that starts at `start` and lasts `duration` frames.
export const prog = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = easeOut,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
