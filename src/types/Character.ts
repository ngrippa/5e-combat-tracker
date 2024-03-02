import { ArrayElement } from "./utils.ts";
import { saves } from "../constants/saves.ts";
import { specialDamageEffects } from "../constants/specialDamageEffects.ts";

export type Effect = { id: string; label: string };

export type StaticCharacter = {
  isPersistent: boolean;
  name: string;
  maxHp: number;
  ac: string;
  saves: Record<ArrayElement<typeof saves>, string>;
  specialDamageEffects: Record<
    ArrayElement<typeof specialDamageEffects>,
    string[]
  >;
  notes: string;
  link: string;
};

export type LibraryCharacter = StaticCharacter & {
  libraryId: string;
  initiative: string;
};

export type Character = StaticCharacter & {
  id: string;
  currentHp: number;
  concentrated: boolean;
  initiative: number;
  effects: {
    preTurn: Effect[];
    postTurn: Effect[];
    status: Effect[];
  };
};
