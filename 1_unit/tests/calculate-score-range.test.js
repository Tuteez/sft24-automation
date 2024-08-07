const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  
  test("1, 6, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(1, 6, 10)).toBe(1);
  });

  test("1, 7, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(1, 7, 10)).toBe(2);
  });

  test("5, 15, 30 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 15, 30)).toBe(2);
  });

  test("5, 15, 31 numbers should get range 3", () => {
    expect(calculateScoreRange(5, 15, 31)).toBe(3);
  });
});
