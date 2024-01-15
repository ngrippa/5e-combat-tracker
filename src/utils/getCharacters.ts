import { orderBy } from "lodash-es";
import { State } from "../state/State.tsx";

export const getCharacters = (
  charactersDict: State["charactersDict"],
  sort: boolean,
) => {
  const chars = Object.values(charactersDict);
  if (!sort) return chars;
  return orderBy(chars, (c) => c.initiative, "desc");
};
