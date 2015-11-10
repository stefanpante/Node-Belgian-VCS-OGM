'use strict';

// Prime Number used to generate the control number.
var MOD = 97;
// 10 digits is the length required before the control number
var LENGTH = 10;

function padWithLeadingZeros(numbers){
	var diffLength = LENGTH - numbers.length;

	if(diffLength === 0){
		return numbers;
	}
	// in ES6: new Array(len).fill(0);
	var padding = new Array(diffLength + 1).join('0');
	return padding + numbers;
}
/**
 * Calculates the control number based on the given numbers
 *
 * control = numbers % 97, unless numbers % 97 === 0, then
 * 97 is used as control.
 *
 * When the control is a single digit, a leading zero is added.
 *
 * @param  {String|Number} 	numbers number to calculate control for.
 * @return {String}         The control number.
 */
function calculateCheckDigits(numbers){
	numbers = parseInt(numbers, 10);
	var control = numbers % MOD;

	control = control === 0 ? 97 : control;
	control = control < 10 ? "0" + control : control.toString();

	return control;

}

/**
 * Checks whether the given OGM is valid. Returns true if valid,
 * false otherwise.
 *
 * @param  {String}  ogm The ogm to check
 * @return {Boolean}     truth value of validity.
 */
function isValidOGM(structuredMessage){
	if(!/\+{3}[0-9]{3}\/[0-9]{4}\/[0-9]{5}\+{3}/.test(structuredMessage)){
		return false;
	}

	var numbers = structuredMessage.match(/\d+/g).join('');
	var firstTen = numbers.substring(0, 10);
	var control = numbers.substring(10, 12);
	var result = calculateCheckDigits(firstTen);

	return result === control;
}

/**
 * Generates a valig ogm based on the given numbers.
 * If the type of numbers is a Number, DO NOT ADD LEADING ZEROES,
 * OTHERWISE THE RESULT IS INTERPRETED AS OCTAL.
 *
 * @param  {String| Number} Numbers to generate ogm from.
 * @return {String}         Structured message
 */
function generateOGM(numbers){

	var control = calculateCheckDigits(numbers);
	numbers = numbers.toString();
	numbers = padWithLeadingZeros(numbers);


	// built the string representation of the ogm.
	return '+++' + numbers.substring(0, 3)
					+ '/' + numbers.substring(3,7)
					+ '/' + numbers.substring(7,10)
					+  control + '+++';
}

/**
 * Generates a random OGM.
 * @return {String} The final OGM.
 */
function generateRandomOGM(){

	// possible because Math.random does not include 1.
	var numbers = Math.floor(Math.random() * 10000000000);
	return generateOGM(numbers);
}



module.exports = {
	isValidOGM: isValidOGM,
	generateOGM: generateOGM,
	calculateCheckDigits: calculateCheckDigits,
	generateRandomOGM: generateRandomOGM
}
