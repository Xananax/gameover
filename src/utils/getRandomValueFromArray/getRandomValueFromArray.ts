/// <reference path="./getRandomValueFromArray.d.ts" />

/**
 * getRandomFromArray returns a random value from a given array.
 * getRandomfromarray :: Array List => Optional Function Random => Any Value
 *
 * List: Array to choose from
 * Random: Random function, defaults to Math.random
 *
 * Usage:
 * ```
 * const value = getRandomfromarray([1,2,3])();//Using Math.random
 * const getRandom = getRandomfromarray(['a','b','c']);
 * const val1 = getRandom(); //Still using Math.random
 * const val2 = getRandom(myOwnRandomFunction); //Using a custom random function
 * ```
 */

export const getRandomValueFromArray:iGetRandomFromArray = function(arr:Array<any>,rand?:RandomProvider):any{
	if(!arr){throw new Error('cannot call getRandomFromArray without an array');}
	function getRandomValue(rand:RandomProvider=Math.random):any{
		const length = arr.length-1;
		if(!length){return arr[0];}
		const index = Math.floor(rand()*length);
		return arr[index];
	}
	if(arguments.length>1){return getRandomValue(rand);}
	return getRandomValue;
}