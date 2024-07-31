/**
 *
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @returns {Number} score range where 1 is low (from 0 to 17 inc) , 2 - medium (18-50), 3 - high (from 51)
 */
/*
function calculateScoreRange(a, b, c) {
  let range = 3;

  if (a + b + c <= 51) {
    range = 2;
  }

  if (a + b + c <= 18) {
    range = 1;
  }

  return range;
}
*/
module.exports = calculateScoreRange;

function calculateScoreRange(a, b, c) {
  let range = 3;

  if (a + b + c < 18) {
    range = 1;
  } else if (a + b + c >= 18 && a + b + c <= 50) {
    range = 2;
  } else if (a + b + c >= 51) {
    range = 3;
  }
  return range;
}