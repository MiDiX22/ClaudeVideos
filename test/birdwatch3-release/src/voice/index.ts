import { createContext, useCallback, useContext } from "react";
import ca from "./ca.json";
import en from "./en.json";

export type Lang = "ca" | "en";

// Each scene starts its voice clip LEAD frames in and holds TAIL frames after the last word.
export const FPS = 30;
export const LEAD = 8;
const TAIL = 16;

const CLIPS = { ca, en };

export type ClipId = (typeof ca)[number]["id"];

export const LangContext = createContext<Lang>("ca");
export const useLang = () => useContext(LangContext);

export const getClip = (lang: Lang, id: ClipId) => {
  const clip = CLIPS[lang].find((c) => c.id === id);
  if (!clip) {
    throw new Error(`No ${lang} voice clip ${id}`);
  }
  return clip;
};

export const sceneDuration = (lang: Lang, id: ClipId, extra = 0) => {
  const words = getClip(lang, id).words;
  return LEAD + Math.round(words[words.length - 1].end * FPS) + TAIL + extra;
};

// Frame (scene-relative) where a cue marked `{key}` in the voice script is spoken.
export const useCue = (id: ClipId) => {
  const lang = useLang();
  return useCallback(
    (key: string) => {
      const cue = (getClip(lang, id).cues as Record<string, number | undefined>)[key];
      if (cue === undefined) {
        throw new Error(`Cue {${key}} is not in the ${lang} voice clip ${id}`);
      }
      return LEAD + Math.round(cue * FPS);
    },
    [lang, id],
  );
};
