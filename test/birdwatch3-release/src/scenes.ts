import { S01Intro } from "./scenes/S01Intro";
import { S02Versions } from "./scenes/S02Versions";
import { S03Docker } from "./scenes/S03Docker";
import { S04Web } from "./scenes/S04Web";
import { S05Settings } from "./scenes/S05Settings";
import { S06Security } from "./scenes/S06Security";
import { S07SCIndoor } from "./scenes/S07SCIndoor";
import { S08Displays } from "./scenes/S08Displays";
import { S09Fixes } from "./scenes/S09Fixes";
import { S10Removed } from "./scenes/S10Removed";
import { S11Outro } from "./scenes/S11Outro";
import { type ClipId, sceneDuration } from "./voice";

type Scene = { id: ClipId; name: string; component: React.FC; duration: number };

const scene = (id: ClipId, name: string, component: React.FC, extra = 0): Scene => ({
  id,
  name,
  component,
  duration: sceneDuration(id, extra),
});

// Each scene lasts as long as its voice clip; the intro and the outro get extra room.
export const SCENES: Scene[] = [
  scene("01-intro", "01 Arriba Birdwatch 3", S01Intro, 24),
  scene("02-versions", "02 Dues versions", S02Versions),
  scene("03-docker", "03 Docker", S03Docker),
  scene("04-web", "04 Web", S04Web),
  scene("05-settings", "05 Paràmetres", S05Settings),
  scene("06-security", "06 Seguretat", S06Security),
  scene("07-scindoor", "07 SC Indoor", S07SCIndoor),
  scene("08-displays", "08 Pantalles i diagnosi", S08Displays),
  scene("09-fixes", "09 Correccions", S09Fixes),
  scene("10-removed", "10 Es retira", S10Removed),
  scene("11-outro", "11 Tancament", S11Outro, 80),
];

export const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);

// Global frame where each scene starts.
export const SCENE_STARTS = SCENES.map((_, i) => SCENES.slice(0, i).reduce((sum, s) => sum + s.duration, 0));
