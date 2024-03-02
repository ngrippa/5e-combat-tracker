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

const nextPhase = (phase: BaseTurnInfo["phase"]): BaseTurnInfo["phase"] => {
  switch (phase) {
    case "preTurn":
      return "mainTurn";
    case "mainTurn":
      return "postTurn";
    default:
      return "preTurn";
  }
};

const nextTurnInfo = (
  current: TurnInfo,
  characters: Character[],
): BaseTurnInfo => {
  if (!current)
    return { phase: "preTurn", currentChar: characters[0].id, turnNumber: 1 };
  const phase = nextPhase(current.phase);
  const char =
    current.phase === "postTurn"
      ? getNextChar(current, characters)
      : current.currentChar;
  return {
    phase,
    currentChar: char,
    turnNumber:
      current.phase === "postTurn"
        ? current.turnNumber + 1
        : current.turnNumber,
  };
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
