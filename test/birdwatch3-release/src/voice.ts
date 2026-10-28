import { useCallback } from "react";
import clips from "./voice.json";

// Each scene starts its voice clip LEAD frames in and holds TAIL frames after the last word.
export const FPS = 30;
export const LEAD = 8;
const TAIL = 16;

export type ClipId = (typeof clips)[number]["id"];

export const getClip = (id: ClipId) => {
  const clip = clips.find((c) => c.id === id);
  if (!clip) {
    throw new Error(`No voice clip ${id}`);
  }
  return clip;
};

export const sceneDuration = (id: ClipId, extra = 0) => {
  const words = getClip(id).words;
  return LEAD + Math.round(words[words.length - 1].end * FPS) + TAIL + extra;
};

// Frame (scene-relative) where the nth occurrence of `word` starts being spoken.
export const useWordFrame = (id: ClipId) => {
  return useCallback(
    (word: string, nth = 0) => {
      const matches = getClip(id).words.filter((w) => w.word === word);
      const match = matches[nth];
      if (!match) {
        throw new Error(`"${word}" #${nth} is not in voice clip ${id}`);
      }
      return LEAD + Math.round(match.start * FPS);
    },
    [id],
  );
};
