const { default: test } = require("node:test");
const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("10, 3, 4 numbers should get range 1", () => {
    expect(calculateScoreRange(10, 3, 4)).toBe(1);
  });

  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });

  test("10, 5, 3 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 5, 3)).toBe(2);
  });
  test("20, 25, 5 numbers should get range 2", () => {
    expect(calculateScoreRange(20, 25, 5)).toBe(2);
  });
  test("20, 25, 6 numbers should get range 2", () => {
    expect(calculateScoreRange(20, 25, 6)).toBe(3);
  });
});
