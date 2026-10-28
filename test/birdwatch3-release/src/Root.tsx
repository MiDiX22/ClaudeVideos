import { Composition } from "remotion";
import { Birdwatch3 } from "./Birdwatch3";
import { getScenes, totalDuration } from "./scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Birdwatch3"
        component={Birdwatch3}
        defaultProps={{ lang: "ca" as const }}
        durationInFrames={totalDuration(getScenes("ca"))}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Birdwatch3-EN"
        component={Birdwatch3}
        defaultProps={{ lang: "en" as const }}
        durationInFrames={totalDuration(getScenes("en"))}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
