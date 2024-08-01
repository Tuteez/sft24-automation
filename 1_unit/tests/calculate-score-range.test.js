const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("0, 0, 0 numbers should get range 1 lower boundary 0", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(1);
  });

  test("1, 6, 10 numbers should get range 1 upper boundary 17", () => {
    expect(calculateScoreRange(1, 6, 10)).toBe(1);
  });

  test("18, 0, 0 numbers should get range 2 lower boundary 18", () => {
    expect(calculateScoreRange(18, 0, 0)).toBe(2);
  });

  test("50, 0, 0 numbers should get range 2 upper boundary 50", () => {
    expect(calculateScoreRange(50, 0, 0)).toBe(2);
  });

  test("51, 0, 0 numbers should get range 2 lower boundary 18", () => {
    expect(calculateScoreRange(51, 0, 0)).toBe(3);
  });
});
