const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("1, 2, 3 numbers should get range 1", () => {
    expect(calculateScoreRange(1, 2, 3)).toBe(1);
  });

  test("5, 7, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 7, 10)).toBe(2);
  });

  test("1, 25, 25 numbers should get range 3", () => {
    expect(calculateScoreRange(1, 25, 25)).toBe(3);
  });
  test("20,20,10 numbers should get range 2", () => {
    expect(calculateScoreRange(20,20, 10)).toBe(2);
  });
  test("5, 5,8 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 5, 8)).toBe(2);
  });
  test("0, 0,0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  test("0, 0,17 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 17)).toBe(1);
  });

});