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