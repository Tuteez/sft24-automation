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

  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1); });

  test("10, 4, 3 numbers should get range 1", () => {
    expect(calculateScoreRange(10, 4, 3)).toBe(1); });

  test("9, 5, 4 numbers should get range 1", () => {
    expect(calculateScoreRange(9, 5, 4)).toBe(2); });
      
  test("11, 29, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(11, 29, 10)).toBe(2);});

  test("26, 15, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(26, 15, 10)).toBe(2);});
});
