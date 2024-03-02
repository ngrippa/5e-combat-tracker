import {
  Character,
  LibraryCharacter,
  StaticCharacter,
} from "../types/Character.ts";
import { nanoid } from "nanoid";
import { DeepPartial } from "../types/utils.ts";
import { cloneDeep, merge } from "lodash-es";

export const baseStaticChar: StaticCharacter = {
  name: "",
  maxHp: 1,
  ac: "10",
  saves: {
    STR: "+0",
    DEX: "+0",
    CON: "+0",
    INT: "+0",
    WIS: "+0",
    CHA: "+0",
  },
  specialDamageEffects: {
    resistances: [],
    immunities: [],
    vulnerabilities: [],
  },
  isPersistent: true,
};

export const baseChar: Character = {
  ...baseStaticChar,
  id: nanoid(),
  currentHp: 1,
  initiative: 0,
  concentrated: false,
  effects: {
    preTurn: [],
    postTurn: [],
    status: [],
  },
};

export const baseLibraryChar: LibraryCharacter = {
  ...baseStaticChar,
  libraryId: nanoid(),
  initiative: "d20 + 0",
};

export const createChar = (char: DeepPartial<Character>): Character =>
  merge(cloneDeep(baseChar), char);
