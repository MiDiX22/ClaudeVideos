import { Composition } from "remotion";
import { IntroVideo } from "./IntroVideo";

// 22s of scenes minus 4 transitions of 0.5s = 20s.
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="IntroClaudeDesign"
      component={IntroVideo}
      durationInFrames={600}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
