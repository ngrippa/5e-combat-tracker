import { Character } from "./Character.ts";

export type BaseTurnInfo = {
  currentChar: Character["id"];
  phase: "preTurn" | "mainTurn" | "postTurn";
};

export type TurnInfo = BaseTurnInfo | null;
