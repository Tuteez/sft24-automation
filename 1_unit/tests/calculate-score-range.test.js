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

  //test if 17 is in range 1
  test("10, 5, 2 numbers should get range 1", () => {
    expect(calculateScoreRange(10, 5, 2)).toBe(1);
  });

  //test if 0 is range 1
  test("0, 0, 0 numbers should get range 1", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });

  //test if 51 is range 3
  test("25, 25, 1 numbers should get range 3", () => {
    expect(calculateScoreRange(25, 25, 1)).toBe(3);
  });

  //test if 18 is range 2
  test("10, 7, 1 numbers should get range 2", () => {
    expect(calculateScoreRange(10, 7, 1)).toBe(2);
  });

});
