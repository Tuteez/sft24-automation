const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("1, 2, 3 numbers should get range 1", () => {
    expect(calculateScoreRange(1, 2, 3)).toBe(1);
  });

  test("5, 7, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 7, 10)).toBe(2);
  });

  test("5, 25, 25 numbers should get range 3", () => {
    expect(calculateScoreRange(5, 25, 25)).toBe(3);
  });
  test("6, 6, 6 numbers should get range 2", () => {
    expect(calculateScoreRange(6, 6, 6)).toBe(2);     //BUG
  });
  test("-1, -2, -3 numbers should get range 1", () => {
    expect(calculateScoreRange(-1, -1, -1)).toBe(1);
  });
  test("24, 25, 1 numbers should get range 2", () => {
    expect(calculateScoreRange(24, 25, 1)).toBe(2);
  });
});
