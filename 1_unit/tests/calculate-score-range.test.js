const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("10, 30, 11 numbers should get range 1", () => {
    expect(calculateScoreRange(10, 30, 11)).toBe(3);
  });
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  test("10, 20, 20 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 20, 20)).toBe(2);
  });
  test("10, 5, 3 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 5, 3)).toBe(2);
  });
  test("5, 12, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(5, 12, 0)).toBe(1);
  });
});
