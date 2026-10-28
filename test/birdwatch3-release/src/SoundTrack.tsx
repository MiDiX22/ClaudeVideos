import { Audio } from "@remotion/media";
import { interpolate, Sequence, staticFile } from "remotion";
import { SCENE_STARTS, SCENES, TOTAL_DURATION } from "./scenes";
import { getClip, LEAD } from "./voice";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The track (96.6 s) is shorter than the video, so a second pass from 30 s in crossfades over its tail.
const MUSIC_LENGTH = 2898;
const SECOND_PASS = MUSIC_LENGTH - 150;
const SECOND_TRIM = 900;

// Music sits low under the voice and opens up only at the very start and the end.
const musicVolume = (f: number) => {
  const voiceEnd = SCENE_STARTS[SCENES.length - 1] + 190;
  const intro = interpolate(f, [0, 10, 24], [0, 0.35, 0.12], clamp);
  const outro = interpolate(f, [voiceEnd, voiceEnd + 20], [0.12, 0.4], clamp);
  const fade = interpolate(f, [TOTAL_DURATION - 45, TOTAL_DURATION - 1], [1, 0], clamp);
  return (f < 24 ? intro : outro) * fade;
};

// Voice-over clip per scene, a whoosh on every cut, and the music bed.
export const SoundTrack: React.FC = () => {
  return (
    <>
      <Audio
        name="Música"
        src={staticFile("music/mixkit-its-love-834.mp3")}
        volume={(f) => musicVolume(f) * interpolate(f, [SECOND_PASS, SECOND_PASS + 120], [1, 0], clamp)}
      />
      <Sequence name="Música (segona passada)" from={SECOND_PASS} layout="none">
        <Audio
          src={staticFile("music/mixkit-its-love-834.mp3")}
          trimBefore={SECOND_TRIM}
          volume={(f) => musicVolume(f + SECOND_PASS) * interpolate(f, [0, 120], [0, 1], clamp)}
        />
      </Sequence>
      {SCENES.map((scene, i) => (
        <Sequence key={scene.id} name={`Locució ${scene.id}`} from={SCENE_STARTS[i] + LEAD} layout="none">
          <Audio src={staticFile(getClip(scene.id).file)} />
        </Sequence>
      ))}
      {SCENE_STARTS.slice(1).map((start) => (
        <Sequence key={start} name="SFX whoosh" from={start - 8} durationInFrames={60} layout="none">
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.25} />
        </Sequence>
      ))}
    </>
  );
};
