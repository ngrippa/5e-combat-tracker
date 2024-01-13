import { globalState, State } from "./State.tsx";
import { useImmer } from "use-immer";
import { nanoid } from "nanoid";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { cloneDeep, merge } from "lodash";
import { baseChar } from "../constants/baseChar.ts";
import { getCharacters } from "../utils/getCharacters.ts";

const zahir = {
  name: "Zahir",
  id: nanoid(),
  maxHp: 120,
  currentHp: 120,
  specialDamageEffects: {
    resistances: ["fire"],
  },
  saves: baseChar.saves,
};
const korvin = {
  name: "Corvin",
  id: nanoid(),
  maxHp: 90,
  currentHp: 90,
  saves: baseChar.saves,
};
const lyra = {
  name: "Lyra",
  id: nanoid(),
  maxHp: 90,
  currentHp: 90,
  saves: baseChar.saves,
};

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
const initialChars = {
  [zahir.id]: zahir,
  [korvin.id]: korvin,
  [lyra.id]: lyra,
} as State["charactersDict"];

const migrateChars = (chars: State["charactersDict"]) => {
  Object.keys(chars).forEach((k) => {
    const newChar = cloneDeep(baseChar);
    chars[k] = merge(newChar, chars[k]);
  });
  return chars;
};

const flatChars = Object.values(initialChars).map((c) => ({
  ...c,
  libraryId: nanoid(),
}));

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [charactersDict, setCharacters] = useSyncedObject<
    State["charactersDict"]
  >("characters", emptyObj, initialChars, migrateChars);

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
  >("characterLibrary", emptyArr, flatChars);

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
