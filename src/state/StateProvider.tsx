import { globalState, State } from "./State.tsx";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createChar } from "../constants/baseChar.ts";
import { getCharacters } from "../utils/getCharacters.ts";
import { useSyncedObject } from "./useSyncedObject.ts";
import { loadMonsters, Monsters } from "../api/loadMonsters.ts";

const emptyObj = {};
const emptyArr: never[] = [];

const migrateChars = (chars: State["charactersDict"]) => {
  Object.keys(chars).forEach((k) => {
    chars[k] = createChar(chars[k]);
  });
  return chars;
};

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [charactersDict, setCharacters] = useSyncedObject<
    State["charactersDict"]
  >("characters", emptyObj, emptyObj, migrateChars);

  const [options, setOptions] = useSyncedObject<State["options"]>(
    "options",
    emptyObj,
    emptyObj,
  );

  const [turnInfo, setTurnInfo] = useSyncedObject<State["turnInfo"]>(
    "turnInfo",
    null,
    null,
  );

  const [characterLibrary, setCharacterLibrary] = useSyncedObject<
    State["characterLibrary"]
  >("characterLibrary", emptyArr, emptyArr);

  const characters = useMemo(
    () => getCharacters(charactersDict, !options.enterInitiative),
    [charactersDict, options.enterInitiative],
  );

  const [monsters, setMonsters] = useState<Monsters>([]);

  useEffect(() => {
    (async () => setMonsters(await loadMonsters()))();
  }, []);

  return (
    <globalState.Provider
      value={{
        characters,
        setCharacters,
        charactersDict,
        options,
        setOptions,
        turnInfo,
        setTurnInfo,
        characterLibrary,
        setCharacterLibrary,
        monsters,
      }}
    >
      {children}
    </globalState.Provider>
  );
};
