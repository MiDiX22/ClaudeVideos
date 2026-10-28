import { Composition } from "remotion";
import { IntroVideo } from "./v1/IntroVideo";
import { Video60 } from "./v2/Video60";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroClaudeDesign60s"
        component={Video60}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* First 20s version, kept for reference: 22s of scenes minus 4 transitions of 0.5s. */}
      <Composition
        id="IntroClaudeDesign20s"
        component={IntroVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
