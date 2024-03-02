import { Character } from "./Character.ts";

export type BaseTurnInfo = {
  currentChar: Character["id"];
  phase: "preTurn" | "mainTurn" | "postTurn";
  turnNumber: number;
};

export type TurnInfo = BaseTurnInfo | null;
