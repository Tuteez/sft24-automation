const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("1, 2, 3 numbers should get range 1", () => {//6
    expect(calculateScoreRange(1, 2, 3)).toBe(1);
  });

  test("5, 7, 10 numbers should get range 2", () => {//22
    expect(calculateScoreRange(5, 7, 10)).toBe(2);
  });

  test("5, 25, 25 numbers should get range 3", () => {//55
    expect(calculateScoreRange(5, 25, 25)).toBe(3);
  });
  test("6, 6, 6 numbers should get range 2", () => {//18
    expect(calculateScoreRange(6, 6, 6)).toBe(2);
  });
  test("6, 6, 5 numbers should get range 1", () => {//17
    expect(calculateScoreRange(6, 6, 5)).toBe(1);
  });
  test("6, 6, 7 numbers should get range 1", () => {//19
    expect(calculateScoreRange(6, 6, 7)).toBe(2);
  });
  test("24, 24, 1 numbers should get range 2", () => {//50
    expect(calculateScoreRange(24, 24, 2)).toBe(2);
  });
  test("24, 24, 1 numbers should get range 2", () => {//51
    expect(calculateScoreRange(24, 24, 3)).toBe(3);
  });
  test("24, 24, 1 numbers should get range 3", () => {//52
    expect(calculateScoreRange(24, 24, 4)).toBe(3);
  });
  test("24, 24, 24 numbers should get range 3", () => {//72
    expect(calculateScoreRange(24, 24, 24)).toBe(3);
  });
  test("0, 0, 0 numbers should get range 1", () => {//0
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });
  /*
  0
  17
  18
  50
  51
  */
});
