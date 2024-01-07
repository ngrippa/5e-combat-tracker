import { State, globalState } from "./State.tsx";
import { useImmer } from "use-immer";
import { nanoid } from "nanoid";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { cloneDeep, merge, orderBy } from "lodash";
import { baseChar } from "../constants/baseChar.ts";

const zahir = { name: "Zahir", id: nanoid(), maxHp: 120, currentHp: 120 };
const korvin = { name: "Corvin", id: nanoid(), maxHp: 90, currentHp: 90 };
const lyra = { name: "Lyra", id: nanoid(), maxHp: 90, currentHp: 90 };

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [charactersDict, setCharacters] = useImmer<State["charactersDict"]>({});
  const [options, setOptions] = useImmer<State["options"]>({});

  const characters = useMemo(() => {
    const chars = Object.values(charactersDict);
    if (options.enterInitiative) return chars;
    return orderBy(chars, (c) => c.initiative, "desc");
  }, [charactersDict, options.enterInitiative]);

  useEffect(() => {
    if (Object.keys(charactersDict).length === 0) return;
    localStorage.setItem("characters", JSON.stringify(charactersDict));
    localStorage.setItem("options", JSON.stringify(options));
  }, [charactersDict, options]);

  useEffect(() => {
    setCharacters((d) => {
      const local = localStorage.getItem("characters");

      d =
        local && local.length > 2
          ? JSON.parse(local)
          : {
              [zahir.id]: zahir,
              [korvin.id]: korvin,
              [lyra.id]: lyra,
            };

      Object.keys(d).forEach((k) => {
        const newChar = cloneDeep(baseChar);
        d[k] = merge(newChar, d[k]);
      });
      return d;
    });

    setOptions((d) => {
      const local = localStorage.getItem("options");
      d = local && local.length > 2 ? JSON.parse(local) : {};
      return d;
    });
  }, [setCharacters, setOptions]);

  return (
    <globalState.Provider
      value={{ characters, setCharacters, charactersDict, options, setOptions }}
    >
      {children}
    </globalState.Provider>
  );
};
