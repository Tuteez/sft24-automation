const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });

  test("0, 7, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 7, 10)).toBe(1);
  });

  test("5, 5, 8 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 5, 8)).toBe(2);
  });

  
  test("25, 20, 5 numbers should get range 2", () => {
    expect(calculateScoreRange(25, 20, 5)).toBe(2);
  });
  
  test("20, 20, 11 numbers should get range 3", () => {
    expect(calculateScoreRange(20, 20, 11)).toBe(3);
  });
  
});
