import { CharacterSprites } from "../../types";

// 🟨 Yellow
import yellow1 from "../../assets/png/concepts/yellow/yellow_1.png";
import yellow2 from "../../assets/png/concepts/yellow/yellow_2.png";
import yellowD from "../../assets/png/concepts/yellow/yellow_d.png";
import yellowX from "../../assets/png/concepts/yellow/yellow_x.png";

// 🟥 Red
import red1 from "../../assets/png/concepts/red/red_1.png";
import red2 from "../../assets/png/concepts/red/red_2.png";
import redD from "../../assets/png/concepts/red/red_d.png";
import redX from "../../assets/png/concepts/red/red_x.png";

// 🟩 Green
import green1 from "../../assets/png/concepts/green/green_1.png";
import green2 from "../../assets/png/concepts/green/green_2.png";
import greenD from "../../assets/png/concepts/green/green_d.png";
import greenX from "../../assets/png/concepts/green/green_x.png";

// 🟦 Blue
import blue1 from "../../assets/png/concepts/blue/blue_1.png";
import blue2 from "../../assets/png/concepts/blue/blue_2.png";
import blueD from "../../assets/png/concepts/blue/blue_d.png";
import blueX from "../../assets/png/concepts/blue/blue_x.png";

export const characterSprites: Record<string, CharacterSprites> = {
  yellow: {
    pose1: yellow1,
    pose2: yellow2,
    drunk: yellowD,
    extreme: yellowX,
  },
  red: {
    pose1: red1,
    pose2: red2,
    drunk: redD,
    extreme: redX,
  },
  green: {
    pose1: green1,
    pose2: green2,
    drunk: greenD,
    extreme: greenX,
  },
  blue: {
    pose1: blue1,
    pose2: blue2,
    drunk: blueD,
    extreme: blueX,
  },
};