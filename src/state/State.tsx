import { createContext, useContext } from "react";
import { Character, LibraryCharacter } from "../types/Character.ts";
import { noop } from "lodash-es";
import { Updater } from "use-immer";
import { Options } from "../types/Options.ts";
import { TurnInfo } from "../types/TurnInfo.ts";
import { Monsters } from "../api/loadMonsters.ts";

type Characters = Record<Character["id"], Character>;
export type State = {
  charactersDict: Characters;
  characters: Character[];
  setCharacters: Updater<Characters>;
  options: Options;
  setOptions: Updater<Options>;
  turnInfo: TurnInfo;
  setTurnInfo: Updater<TurnInfo>;
  characterLibrary: LibraryCharacter[];
  setCharacterLibrary: Updater<LibraryCharacter[]>;
  monsters: Monsters;
};

export const globalState = createContext<State>({
  charactersDict: {},
  characters: [],
  setCharacters: noop,
  options: {},
  setOptions: noop,
  turnInfo: null,
  setTurnInfo: noop,
  characterLibrary: [],
  setCharacterLibrary: noop,
  monsters: [],
});

export const useGlobalState = () => useContext(globalState);
