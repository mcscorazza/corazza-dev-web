import chroma from "chroma-js";

export type TailwindPalette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export function generatePalette(baseColor: string): TailwindPalette {
  if (!chroma.valid(baseColor)) {
    throw new Error(`Cor base inválida: ${baseColor}`);
  }

  const scale = chroma
    .scale(["#ffffff", baseColor, "#000000"])
    .mode("lch")
    .domain([0, 0.5, 1]);

  return {
    50: scale(0.05).hex(),
    100: scale(0.1).hex(),
    200: scale(0.2).hex(),
    300: scale(0.3).hex(),
    400: scale(0.4).hex(),
    500: scale(0.5).hex(),
    600: scale(0.6).hex(),
    700: scale(0.7).hex(),
    800: scale(0.8).hex(),
    900: scale(0.9).hex(),
    950: scale(0.95).hex(),
  };
}
