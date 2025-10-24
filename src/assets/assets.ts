import main from './png/main.png';
import exit from './png/exit.png';
import finish from './png/finish.png';

// Icons
import back from './png/icons/back.png';
import close from './png/icons/close.png';
import settings from './png/icons/settings.png';

// 🟨 Yellow
import yellow1 from "./png/characters/yellow/yellow_1.png";
import yellow2 from "./png/characters/yellow/yellow_2.png";
import yellowD from "./png/characters/yellow/yellow_d.png";
import yellowX from "./png/characters/yellow/yellow_x.png";

// 🟥 Red
import red1 from "./png/characters/red/red_1.png";
import red2 from "./png/characters/red/red_2.png";
import redD from "./png/characters/red/red_d.png";
import redX from "./png/characters/red/red_x.png";

// 🟩 Green
import green1 from "./png/characters/green/green_1.png";
import green2 from "./png/characters/green/green_2.png";
import greenD from "./png/characters/green/green_d.png";
import greenX from "./png/characters/green/green_x.png";

// 🟦 Blue
import blue1 from "./png/characters/blue/blue_1.png";
import blue2 from "./png/characters/blue/blue_2.png";
import blueD from "./png/characters/blue/blue_d.png";
import blueX from "./png/characters/blue/blue_x.png";

export const assets = {
  png: {
    main: main,
    finish: finish,
    exit: exit,
    characters: {
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
    },
    icons: {
      back: back,
      close: close,
      settings: settings
    }
  }
}