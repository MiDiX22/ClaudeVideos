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
import { type ClipId, type Lang, sceneDuration } from "./voice";

type Scene = { id: ClipId; name: string; component: React.FC; duration: number };

const SCENE_LIST: [ClipId, string, React.FC, number?][] = [
  ["01-intro", "01 Arriba Birdwatch 3", S01Intro, 24],
  ["02-versions", "02 Dues versions", S02Versions],
  ["03-docker", "03 Docker", S03Docker],
  ["04-web", "04 Web", S04Web],
  ["05-settings", "05 Paràmetres", S05Settings],
  ["06-security", "06 Seguretat", S06Security],
  ["07-scindoor", "07 SC Indoor", S07SCIndoor],
  ["08-displays", "08 Pantalles i diagnosi", S08Displays],
  ["09-fixes", "09 Correccions", S09Fixes],
  ["10-removed", "10 Es retira", S10Removed],
  ["11-outro", "11 Tancament", S11Outro, 80],
];

// Each scene lasts as long as its voice clip in that language; the intro and the outro get extra room.
export const getScenes = (lang: Lang): Scene[] =>
  SCENE_LIST.map(([id, name, component, extra = 0]) => ({ id, name, component, duration: sceneDuration(lang, id, extra) }));

export const totalDuration = (scenes: Scene[]) => scenes.reduce((sum, s) => sum + s.duration, 0);

// Frame where each scene starts.
export const sceneStarts = (scenes: Scene[]) => scenes.map((_, i) => totalDuration(scenes.slice(0, i)));
