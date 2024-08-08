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

test("15, 1, 1 numbers should get range 1", () => {
  expect(calculateScoreRange(15, 1, 1)).toBe(1);
});

test("0, -1, 1 numbers should get range 1", () => {
  expect(calculateScoreRange(0, -1, 1)).toBe(1);
});


test("16, 1, 1 numbers should get range 2", () => {
  expect(calculateScoreRange(16, 1, 1)).toBe(2);
});

test("20, 5, 25 numbers should get range 2", () => {
  expect(calculateScoreRange(20, 5, 25)).toBe(2);
});

test("20, 6, 25 numbers should get range 3", () => {
  expect(calculateScoreRange(20, 6, 25)).toBe(3);
});
});
