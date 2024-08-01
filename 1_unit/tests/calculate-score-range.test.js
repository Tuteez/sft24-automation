const calculateScoreRange = require("../functions/calculate-score-range");
/*
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
});
*/

describe("calculateScoreRange tests", () => {
  test("0, -2, 2 numbers should get range 1", () => {
    expect(calculateScoreRange(0, -2, 2)).toBe(1);
  }); //sum 0

  test("5, 2, 10 numbers should get range 1", () => {
    expect(calculateScoreRange(5, 2, 10)).toBe(1);
  }); //sum 17

  test("5, 3, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(5, 3, 10)).toBe(2);
  });//sum 18


  test("20, 20, 10 numbers should get range 2", () => {
    expect(calculateScoreRange(20, 20, 10)).toBe(2);
  });//sum 50



  test("20, 20, 11 numbers should get range 3", () => {
    expect(calculateScoreRange(20, 20, 11)).toBe(3);
  });//sum 51
}); 

