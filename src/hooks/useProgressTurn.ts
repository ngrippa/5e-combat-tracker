import { useGlobalState } from "../state/State.tsx";
import { useCallback } from "react";
import { BaseTurnInfo, TurnInfo } from "../types/TurnInfo.ts";
import { Character } from "../types/Character.ts";
import { getCharacters } from "../utils/getCharacters.ts";

const getNextChar = (current: BaseTurnInfo, characters: Character[]) => {
  const newIndex =
    characters.findIndex((c) => c.id === current?.currentChar) + 1;
  return characters[newIndex]?.id ?? characters[0].id;
};

const nextTurnInfo = (
  current: TurnInfo,
  characters: Character[],
): BaseTurnInfo => {
  if (!current) return { phase: "preTurn", currentChar: characters[0].id };
  const phase =
    current.phase === "preTurn"
      ? "mainTurn"
      : current.phase === "mainTurn"
        ? "postTurn"
        : "preTurn";
  const char =
    current.phase === "postTurn"
      ? getNextChar(current, characters)
      : current.currentChar;
  return { phase, currentChar: char };
};

export const useProgressTurn = () => {
  const { setTurnInfo, charactersDict } = useGlobalState();

  return useCallback(() => {
    const characters = getCharacters(charactersDict, true);
    setTurnInfo((d) => {
      do {
        d = nextTurnInfo(d, characters);
      } while (
        d.phase !== "mainTurn" &&
        !charactersDict[d.currentChar].effects[d.phase].length
      );

      return d;
    });
  }, [charactersDict, setTurnInfo]);
};
