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
// Range: 17-1,   18 -2 ,  51-3 
test("0 numbers should get range 1", () => {
  expect(calculateScoreRange(0,0,0)).toBe(1);
});
  test("10,3,4 numbers should get range 1", () => {
    expect(calculateScoreRange(10,3,4)).toBe(1);
  });
  test("10,5,3 numbers should get range 2", () => {
    expect(calculateScoreRange(10,5,3 )).toBe(2);
  });
  test("40,6,4 numbers should get range 2", () => {
    expect(calculateScoreRange(40,6,4)).toBe(2);
  });  test("45,5,1 numbers should get range 3", () => {
    expect(calculateScoreRange(45,5,1)).toBe(3);
  });
});
