const calculateScoreRange = require("../functions/calculate-score-range");

describe("calculateScoreRange tests", () => {
  // test("1, 2, 3 numbers should get range 1", () => {
  //   expect(calculateScoreRange(1, 2, 3)).toBe(1);
  // });// sum 6

  // test("5, 7, 10 numbers should get range 2", () => {
  //   expect(calculateScoreRange(5, 7, 10)).toBe(2);
  // }); //sum 22

  // test("5, 25, 25 numbers should get range 3", () => {
  //   expect(calculateScoreRange(5, 25, 25)).toBe(3);
  // }); //sum 55

  test("0, -2, 2  numbers should get range 1", () => {
    expect(calculateScoreRange(0, -2, 2)).toBe(1);
  }); // sum 0

  test("5, 2, 10  numbers should get range 1", () => {
    expect(calculateScoreRange(5, 2, 10)).toBe(1);
  }); // sum 17

  test("5, 3, 10  numbers should get range 1", () => {
    expect(calculateScoreRange(5, 3, 10)).toBe(2);
  }); // sum 18

  test("20, 10, 20  numbers should get range 1", () => {
    expect(calculateScoreRange(20, 10, 20)).toBe(2);
  }); // sum 50

  test("1, 20, 30  numbers should get range 1", () => {
    expect(calculateScoreRange(1, 20, 30)).toBe(3);
  }); // sum 51





});

