/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @returns {Number} score range where 1 is low, 2 - medium, 3 - high
 */
function calculateScoreRange(a, b, c) {
    let sum = calculateSumOfNumbers(a,b,c);
    let average = calculateAverageOfProvidedNumbers(a,b,c);

    return selectRangeNumber(sum, average);
}

/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c
 * @returns {Number} returns sum of provided numbers 
 */
function calculateSumOfNumbers(a, b, c) {
    return a + b + c;
}

/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @returns {Number} returns average of 3 numbers that were provided
 */
function calculateAverageOfProvidedNumbers(a,b,c){
    return calculateSumOfNumbers(a,b,c) / 3;
}

/**
 * 
 * @param {Number} sum 
 * @param {Number} average 
 * @returns {Number} returns range number based on sum and average input
 */
function selectRangeNumber(sum, average){

    if(sum < 18 && average < 6){
        return 1;
    }

    if(sum < 51 && average < 17){
        return 2;
    }

    return 3;
}

module.exports.calculateScoreRange = calculateScoreRange;
module.exports.selectRangeNumber = selectRangeNumber;