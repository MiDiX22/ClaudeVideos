import { AbsoluteFill, Sequence, Series } from "remotion";
import { getScenes, sceneStarts } from "./scenes";
import { SoundTrack } from "./SoundTrack";
import { type Lang, LangContext } from "./voice";
import { WIPE, Wipe } from "./Wipe";

export type Birdwatch3Props = { lang: Lang };

// Birdwatch 3 release video: one scene per voice-over clip, a branded wipe over every cut.
export const Birdwatch3: React.FC<Birdwatch3Props> = ({ lang }) => {
  const scenes = getScenes(lang);
  return (
    <LangContext.Provider value={lang}>
      <AbsoluteFill>
        <SoundTrack lang={lang} />
        <Series>
          {scenes.map(({ id, name, component: Scene, duration }) => (
            <Series.Sequence key={id} name={name} durationInFrames={duration}>
              <Scene />
            </Series.Sequence>
          ))}
        </Series>
        {sceneStarts(scenes)
          .slice(1)
          .map((start) => (
            <Sequence key={start} name="Wipe" from={start - WIPE / 2} durationInFrames={WIPE}>
              <Wipe />
            </Sequence>
          ))}
      </AbsoluteFill>
    </LangContext.Provider>
  );
};
