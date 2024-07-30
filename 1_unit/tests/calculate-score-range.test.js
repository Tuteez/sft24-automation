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

  test("4, 5, 8 numbers should get range 1", () => {
    expect(calculateScoreRange(4, 5, 8)).toBe(1);
  });

  test("3, 7, 8 numbers should get range 2", () => {
    expect(calculateScoreRange(3, 7, 8)).toBe(2);
  });

  test("10, 15, 25 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 15, 25)).toBe(2);
  });

  test("10, 11, 30 numbers should get range 3", () => {
    expect(calculateScoreRange(10, 11, 30)).toBe(3);
  });

  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
});
