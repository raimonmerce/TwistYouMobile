import { GameSettings, Task } from "../../types";
import { MIN_DRINKS, MAX_DRINKS } from "../../constants";
import { DataManager } from "../../data/DataManager";

type TranslateFunction = (key: string, options?: any) => string;

export default class Turn {
  private players: string[];
  private tasks: Task[];
  private taskMaster: Task[];
  private parts: string[];
  private basicTask: string;
  private of: string;
  private t: TranslateFunction;

  constructor(settings: GameSettings, players: string[], t: TranslateFunction) {
    this.players = players;
    this.t = t;
    this.basicTask = "game.basicTask";
    this.of = "game.of";
    
    this.tasks = DataManager.getTasks(settings);
    this.parts = DataManager.getParts(settings);
    this.taskMaster = DataManager.getTasksMasters(settings);
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getFullSentence(text: string, currentPlayer: string): string {
    const translatedText = this.t(text);
    return translatedText
      .replace("$num", this.getRandomNumber(MIN_DRINKS, MAX_DRINKS).toString())
      .replace("$player", this.getRandomElement(this.players.filter(p => p !== 'Master')))
      .replace("$selfPlayer", currentPlayer)
      .replace("$otherPlayer", this.getRandomElement(this.players.filter(p => p !== currentPlayer && p !== 'Master')))
      .replace("$color", this.t(this.getRandomElement(DataManager.getSpecificItems('colors'))))
      .replace("$part", this.t(this.getRandomElement(this.parts)))
      .replace("$part2", this.t(this.getRandomElement(this.parts)))
      .replace("$extremePart", this.t(this.getRandomElement(DataManager.getSpecificItems('extremeParts'))));
  }

  generateText(player: string): string {
    const task: Task =
      player === 'Master'
        ? this.getRandomElement(this.taskMaster)
        : Math.random() < 0.5
          ? {
              type: "general",
              text: `${this.t(this.basicTask)} ${this.t(this.of)}`,
            }
          : this.getRandomElement(this.tasks);
  
    return this.capitalizeFirstLetter(this.getFullSentence(task.text, player));
  }

  generateTask(player: string): Task {
    const isMaster = player === "Master";

    const task: Task = isMaster
      ? this.getRandomElement(this.taskMaster)
      : Math.random() < 0.5
        ? {
            type: "general",
            text: `${this.t(this.basicTask)} ${this.t(this.of)}`,
          }
        : this.getRandomElement(this.tasks);

    const text = this.capitalizeFirstLetter(
      this.getFullSentence(task.text, player)
    );

    return { ...task, text };
  }
}
