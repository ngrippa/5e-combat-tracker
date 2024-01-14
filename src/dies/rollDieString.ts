// import { rollDice } from "./rollDie.ts";

import { rollDice } from "./rollDie.ts";

type ParsedDieExpression = { sign: number } & (
  | { constant: number }
  | { amount: number; sides: number }
);
export const splitExpression = (expression: string): ParsedDieExpression[] => {
  const terms = expression.split(/([+-][^+-]*)/).filter(Boolean);

  if (!terms) return [];

  return terms.map((term) => {
    const firstChar = term[0];
    const sign = firstChar === "-" ? -1 : 1;
    const cleanTerm = ["+", "-"].includes(firstChar) ? term.substring(1) : term;
    if (cleanTerm.includes("d")) {
      const s = cleanTerm.split("d");
      return { sign, amount: +(s[0] || "1"), sides: +s[1] };
    } else {
      return { sign, constant: +cleanTerm };
    }
  });
};
export const rollDieString = (str: string) => {
  const parts = splitExpression(str);
  const results = parts.map((term) => {
    let partRes = 0;
    if ("constant" in term) {
      partRes += term.constant;
    } else {
      for (let i = 0; i < term.amount; i++) partRes += rollDice(term.sides);
    }
    partRes *= term.sign;
    return partRes;
  });
  return results.reduce((acc, curr) => acc + curr, 0);
};
