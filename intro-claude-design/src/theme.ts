import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Quercus BirdWatch design system: brand colours and Open Sans.
// The font files are bundled in public/fonts so renders work offline.
export const fontFamily = "Open Sans";

for (const weight of ["400", "600", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/open-sans-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const colors = {
  orange: "#ef7911",
  grey: "#575756",
  white: "#ffffff",
  ink: "#2b2b2a",
  surface: "#f0f0ee",
};

// Expo-out curve used for every entrance.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
