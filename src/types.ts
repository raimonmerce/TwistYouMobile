import { ImageSourcePropType } from "react-native";

export type GameSettings = {
  adultMode: boolean;
  colorMode: boolean;
  alcoholMode: boolean;
  extremoMode: boolean;
  masterMode: boolean;
};

export type Page = "landing" | "main" | "game" | "players" | "settings";
export type TaskType = "general" | "color" | "alcohol" | "extreme" | "master" | "masterExtreme";

export type Task = {
  type: TaskType
  text: string;
}

export type CharacterImageAnimation = {
  initial: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    opacity: number;
  };
  final: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    opacity: number;
  };
  duration: number;
};

export type CharacterSprites = {
  pose1: ImageSourcePropType;
  pose2: ImageSourcePropType;
  drunk: ImageSourcePropType;
  extreme: ImageSourcePropType;
};

const lightBlue = "88bdff"
const lightRed = "ff4d99"
const lightGreen = "a4ffdd"
const lightYellow = "ffe77d"

const darkBlue = "3280f3"
const darkRed = "ad0568"
const darkGreen = "47ffbd"
const darkYellow = "ffdb3e"