import { Character } from "../types/Character.ts";
import { nanoid } from "nanoid";
import { DeepPartial } from "../types/utils.ts";
import { cloneDeep, merge } from "lodash-es";

export const baseChar: Character = {
  name: "Untitled",
  id: nanoid(),
  maxHp: 1,
  currentHp: 1,
  initiative: 0,
  concentrated: false,
  ac: "0 (+0 with Shield)",
  saves: {
    STR: "+3",
    DEX: "-1",
    CON: "+5",
    INT: "0",
    WIS: "+3",
    CHA: "+3",
  },
  effects: {
    preTurn: [],
    postTurn: [],
    status: [],
  },
  specialDamageEffects: {
    resistances: [],
    immunities: [],
    vulnerabilities: [],
  },
  isPersistent: true,
};

export const createChar = (char: DeepPartial<Character>): Character =>
  merge(cloneDeep(baseChar), char);
