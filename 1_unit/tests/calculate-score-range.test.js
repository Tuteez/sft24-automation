const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {

  test("0, 0, 0 numbers should get range 3", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  
  test("6, 7, 4 numbers should get range 1", () => {
    expect(calculateScoreRange(6, 7, 4)).toBe(1);
  });

  
  test("5, 6, 7 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 6, 7)).toBe(2);
  });

  
  test("20, 20, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(20, 20, 10)).toBe(2);
  });

  
  test("1, 25, 25 numbers should get range 3", () => {
    expect(calculateScoreRange(1, 25, 25)).toBe(3);
  });
});
