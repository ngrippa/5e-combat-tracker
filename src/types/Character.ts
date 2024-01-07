import { ArrayElement } from "./utils.ts";
import { saves } from "../constants/saves.ts";

export type Effect = { id: string; label: string };

export type Character = {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  concentrated: boolean;
  initiative: number;
  ac: string;
  saves: Record<ArrayElement<typeof saves>, string>;
  effects: {
    preTurn: Effect[];
    postTurn: Effect[];
    status: Effect[];
  };
};
