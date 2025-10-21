import { CharacterImageAnimation } from "../../types";
export const characterAnimations: Record<string, CharacterImageAnimation> = {
  floatUp: {
    initial: { position: { x: 0, y: 300 }, scale: 1, rotation: 30, opacity: 0 },
    final: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
    duration: 1000,
  },
  popIn: {
    initial: { position: { x: 0, y: 0 }, scale: 0.3, rotation: 0, opacity: 0 },
    final: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
    duration: 700,
  },
  spinIn: {
    initial: { position: { x: -100, y: 200 }, scale: 0.8, rotation: 360, opacity: 0 },
    final: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
    duration: 900,
  },
};