import { AbsoluteFill, Sequence, Series } from "remotion";
import { SCENE_STARTS, SCENES } from "./scenes";
import { SoundTrack } from "./SoundTrack";
import { WIPE, Wipe } from "./Wipe";

// Birdwatch 3 release video: one scene per voice-over clip, a branded wipe over every cut.
export const Birdwatch3: React.FC = () => {
  return (
    <AbsoluteFill>
      <SoundTrack />
      <Series>
        {SCENES.map(({ id, name, component: Scene, duration }) => (
          <Series.Sequence key={id} name={name} durationInFrames={duration}>
            <Scene />
          </Series.Sequence>
        ))}
      </Series>
      {SCENE_STARTS.slice(1).map((start) => (
        <Sequence key={start} name="Wipe" from={start - WIPE / 2} durationInFrames={WIPE}>
          <Wipe />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
