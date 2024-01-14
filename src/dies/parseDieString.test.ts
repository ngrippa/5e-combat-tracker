import { rollDieString, splitExpression } from "./rollDieString.ts";

const dieExp1 = "2d10+2d4-d6+10";
const dieExp2 = "-9-2d4+1d6-20";
const dieExp3 = "-d20";

const simulate = (exp: string, n = 1000) => {
  let acc = 0;
  for (let i = 0; i < n; i++) {
    acc += rollDieString(exp);
  }
  return acc / n;
};

describe("Parse Die String", () => {
  it("should be correct for " + dieExp1, () => {
    expect(splitExpression(dieExp1)).toEqual([
      { sign: 1, amount: 2, sides: 10 },
      { sign: 1, amount: 2, sides: 4 },
      { sign: -1, amount: 1, sides: 6 },
      { sign: 1, constant: 10 },
    ]);
    const res = simulate(dieExp1);
    expect(res).toBeGreaterThan(22);
    expect(res).toBeLessThan(23);
  });

  it("should be correct for " + dieExp2, () => {
    expect(splitExpression(dieExp2)).toEqual([
      { sign: -1, constant: 9 },
      { sign: -1, amount: 2, sides: 4 },
      { sign: 1, amount: 1, sides: 6 },
      { sign: -1, constant: 20 },
    ]);
    const res = simulate(dieExp2);
    expect(res).toBeGreaterThan(-31);
    expect(res).toBeLessThan(-30);
  });

  it("should be correct for " + dieExp3, () => {
    expect(splitExpression(dieExp3)).toEqual([
      { sign: -1, amount: 1, sides: 20 },
    ]);
    const res = simulate(dieExp3);
    expect(res).toBeGreaterThan(-11);
    expect(res).toBeLessThan(-10);
  });
});
