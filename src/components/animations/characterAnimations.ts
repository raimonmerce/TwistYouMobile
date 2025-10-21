import { CharacterImageAnimation } from "../../types";
export const characterAnimations: Record<string, CharacterImageAnimation> = {
    topRight: {
        initial: { position: { x: 400, y: -500 }, scale: 0.8, rotation: 180, opacity: 1 },
        final: { position: { x: 100, y: -400 }, scale: 1, rotation: 210, opacity: 1 },
        duration: 750,
    },
    topLeft: {
        initial: { position: { x: -400, y: -500 }, scale: 0.8, rotation: 180, opacity: 1 },
        final: { position: { x: -100, y: -400 }, scale: 1, rotation: 150, opacity: 1 },
        duration: 750,
    },
    right: {
        initial: { position: { x: 400, y: 100 }, scale: 1, rotation: 0, opacity: 1 },
        final: { position: { x: 150, y: 0 }, scale: 1.2, rotation: -20, opacity: 1 },
        duration: 750,
    },
    left: {
        initial: { position: { x: -400, y: 100 }, scale: 1, rotation: 0, opacity: 1 },
        final: { position: { x: -150, y: 0 }, scale: 1.2, rotation: 20, opacity: 1 },
        duration: 750,
    },
    bottom: {
        initial: { position: { x: 0, y: 500 }, scale: 1, rotation: 0, opacity: 1 },
        final: { position: { x: 0, y: 200 }, scale: 1.2, rotation: 0, opacity: 1 },
        duration: 750,
    },
    bottomRight: {
        initial: { position: { x: 400, y: 300 }, scale: 1, rotation: 0, opacity: 1 },
        final: { position: { x: 100, y: 200 }, scale: 1.2, rotation: -30, opacity: 1 },
        duration: 750,
    },
    bottomLeft: {
        initial: { position: { x: -400, y: 300 }, scale: 1, rotation: 0, opacity: 1 },
        final: { position: { x: -100, y: 200 }, scale: 1.2, rotation: 30, opacity: 1 },
        duration: 750,
    },
    appearRight: {
        initial: { position: { x: 300, y: 250 }, scale: 1, rotation: -10, opacity: 1 },
        final: { position: { x: 0, y: 200 }, scale: 1.2, rotation: 0, opacity: 1 },
        duration: 750,
    },
    appearLeft: {
        initial: { position: { x: -300, y: 250 }, scale: 1, rotation: 10, opacity: 1 },
        final: { position: { x: 0, y: 200 }, scale: 1.2, rotation: 0, opacity: 1 },
        duration: 750,
    },

};