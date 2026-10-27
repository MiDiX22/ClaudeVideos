import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Easing, useVideoConfig } from "remotion";
import { Agenda } from "./scenes/Agenda";
import { Hook } from "./scenes/Hook";
import { Opening } from "./scenes/Opening";
import { Outro } from "./scenes/Outro";
import { Title } from "./scenes/Title";
import { EASE_IN_OUT } from "./theme";

const transition = linearTiming({
  durationInFrames: 15,
  easing: Easing.bezier(...EASE_IN_OUT),
});

export const IntroVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Opening" durationInFrames={3 * fps}>
        <Opening />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={transition}
      />
      <TransitionSeries.Sequence name="Hook" durationInFrames={4 * fps}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={transition}
      />
      <TransitionSeries.Sequence name="Title" durationInFrames={3 * fps}>
        <Title />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={transition}
      />
      <TransitionSeries.Sequence name="Agenda" durationInFrames={6.5 * fps}>
        <Agenda />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-bottom-left" })}
        timing={transition}
      />
      <TransitionSeries.Sequence name="Outro" durationInFrames={5.5 * fps}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
