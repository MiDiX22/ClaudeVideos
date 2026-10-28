import { Composition } from "remotion";
import { Birdwatch3 } from "./Birdwatch3";
import { TOTAL_DURATION } from "./scenes";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Birdwatch3"
      component={Birdwatch3}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
