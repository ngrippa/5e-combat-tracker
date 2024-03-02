import { globalState, State } from "./State.tsx";
import { useImmer } from "use-immer";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createChar } from "../constants/baseChar.ts";
import { getCharacters } from "../utils/getCharacters.ts";

const useSyncedObject = <T extends Record<string, unknown> | unknown[] | null>(
  key: string,
  initialStateValue: T,
  initialStoreValue: T,
  migrate?: (old: T) => T,
) => {
  const [obj, setObj] = useImmer<T>(initialStateValue);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(key, JSON.stringify(obj));
  }, [obj, key, isLoading]);

  useEffect(() => {
    const local = localStorage.getItem(key);

    setObj((d) => {
      const read =
        local && local.length > 2 ? JSON.parse(local) : initialStoreValue;
      d = migrate?.(read) || read;
      return d;
    });
    setLoading(false);
  }, [key, initialStoreValue, migrate, setObj]);
  return [obj, setObj] as const;
};

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
      }}
    >
      {children}
    </globalState.Provider>
  );
};