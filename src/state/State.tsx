import { createContext, useContext } from "react";
import { Character } from "../types/Character.ts";
import { noop } from "lodash";
import { Updater } from "use-immer";
import { Options } from "../types/Options.ts";

type Characters = Record<Character["id"], Character>;
export type State = {
  charactersDict: Characters;
  characters: Character[];
  setCharacters: Updater<Characters>;
  options: Options;
  setOptions: Updater<Options>;
};

export const globalState = createContext<State>({
  charactersDict: {},
  characters: [],
  setCharacters: noop,
  options: {},
  setOptions: noop,
});

export const useGlobalState = () => useContext(globalState);
