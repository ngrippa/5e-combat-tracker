import { baseUrl, requestOptions } from "./5e-bits.ts";
import { ArrayElement } from "../types/utils.ts";
import { abilityScores } from "../constants/saves.ts";

export type Monster = { index: string; name: string; url: string };
export type Monsters = Monster[];
export type MonsterDetails = {
  name: string;
  index: string;
  armor_class: { value: number }[];
  hit_points: number;
  proficiencies: {
    value: number;
    proficiency: {
      index: "saving-throw-con";
    };
  }[];
} & Record<ArrayElement<typeof abilityScores>, number>;
export const loadMonsters = async () => {
  const res = await fetch(baseUrl + "/api/monsters", requestOptions);
  const json: { results: Monsters } = await res.json();
  return json.results;
};
