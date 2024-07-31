const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("5, 5, 7 numbers should get range 1", () => {
    expect(calculateScoreRange(5, 5, 7)).toBe(1);
  });

  test("5, 5, 8 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 5, 8)).toBe(2);
  });
  test("1, 2, 3 numbers should get range 1", () => {
    expect(calculateScoreRange(5, 5, 40)).toBe(2);
  });

  test("5, 7, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 5, 41)).toBe(3);
  });

  test("5, 25, 25 numbers should get range 3", () => {
    expect(calculateScoreRange(5, 25, 25)).toBe(3);
  });
});
