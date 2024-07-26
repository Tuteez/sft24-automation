const scoreRangeCalculator = require('../functions/calculate-score-range');

//In the workshop we did not work with integration tests, it was left to the most curious students to explore :)
test('1, 25, 25 numbers should generate high score', () => {
    expect(scoreRangeCalculator.calculateScoreRange(1, 25, 25)).toBe(3);
});