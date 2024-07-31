const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  }); //0
  
  test("1, 2, 14 numbers should get range 1", () => {
    expect(calculateScoreRange(1, 2, 14)).toBe(1);
  }); //17

  test("1, 7, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(1, 7, 10)).toBe(2);
  }); //18

  test("1, 1, 48 numbers should get range 2", () => {
    expect(calculateScoreRange(1, 1, 48)).toBe(2);
  }); //50

  test("1, 25, 25 numbers should get range 3", () => {
    expect(calculateScoreRange(1, 25, 25)).toBe(3);
  }); //51
  
});
