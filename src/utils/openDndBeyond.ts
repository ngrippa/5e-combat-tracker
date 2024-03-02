import { StaticCharacter } from "../types/Character.ts";

export const openDndBeyond = (char: StaticCharacter) => () => {
  if (char.link) window.open(char.link, "_blank");
};
