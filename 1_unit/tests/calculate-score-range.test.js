const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  //0
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  //17
  test("1, 6, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(1, 6, 10)).toBe(1);
  });
  //18
  test("2, 6, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(2, 6, 10)).toBe(2);
  });
  //50
  test("10, 15, 25 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 15, 25)).toBe(2);
  });
  //51
  test("48, 1, 2 numbers should get range 3", () => {
    expect(calculateScoreRange(48, 1, 2)).toBe(3);
  });  
});
