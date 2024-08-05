const { test, expect } = require('@playwright/test');
const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  test("TEsting 17 should get r 1", () => {
    expect(calculateScoreRange(1, 1, 15)).toBe(1);
  });

  test("18 numbers should get range 2", () => {
    expect(calculateScoreRange(1, 1, 16)).toBe(2);
  });

  test("50 numbers should get range 2", () => {
    expect(calculateScoreRange(1, 1, 48)).toBe(2);
  });
  test("Testin 17", () => {
    expect(calculateScoreRange(1, 1, 49)).toBe(2);
  });
    test("Testin 17", () => {
    expect(calculateScoreRange(0, 0, 0)).toBe(0);
  });
});
