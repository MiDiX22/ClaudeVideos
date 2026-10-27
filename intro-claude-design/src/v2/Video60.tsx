import { Series, useVideoConfig } from "remotion";
import { S01PixelIntro } from "./scenes/S01PixelIntro";
import { S02Loop } from "./scenes/S02Loop";
import { S03Iterations } from "./scenes/S03Iterations";
import { S04Filename } from "./scenes/S04Filename";
import { S05Break } from "./scenes/S05Break";
import { S06Title } from "./scenes/S06Title";
import { S07Brand } from "./scenes/S07Brand";
import { S08Variants } from "./scenes/S08Variants";
import { S09Outputs } from "./scenes/S09Outputs";
import { S10Mantra } from "./scenes/S10Mantra";
import { S11Outro } from "./scenes/S11Outro";
import { SoundTrack } from "./SoundTrack";

// Scene lengths follow the timings in GUIO.md.
export const Video60: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <SoundTrack />
      <Series>
        <Series.Sequence name="01 Som R+D" durationInFrames={5 * fps}>
          <S01PixelIntro />
        </Series.Sequence>
        <Series.Sequence name="02 El bucle" durationInFrames={5 * fps}>
          <S02Loop />
        </Series.Sequence>
        <Series.Sequence name="03 Iteracions" durationInFrames={7 * fps}>
          <S03Iterations />
        </Series.Sequence>
        <Series.Sequence name="04 Fitxer final" durationInFrames={4 * fps}>
          <S04Filename />
        </Series.Sequence>
        <Series.Sequence name="05 Sortir del bucle" durationInFrames={4 * fps}>
          <S05Break />
        </Series.Sequence>
        <Series.Sequence name="06 Claude Design" durationInFrames={4 * fps}>
          <S06Title />
        </Series.Sequence>
        <Series.Sequence name="07 Marca" durationInFrames={5 * fps}>
          <S07Brand />
        </Series.Sequence>
        <Series.Sequence name="08 Variants" durationInFrames={6 * fps}>
          <S08Variants />
        </Series.Sequence>
        <Series.Sequence
          name="09 Prototip, presentació, codi"
          durationInFrames={5 * fps}
        >
          <S09Outputs />
        </Series.Sequence>
        <Series.Sequence name="10 Menys voltes" durationInFrames={6 * fps}>
          <S10Mantra />
        </Series.Sequence>
        <Series.Sequence name="11 Tancament" durationInFrames={9 * fps}>
          <S11Outro />
        </Series.Sequence>
      </Series>
    </>
  );
};
