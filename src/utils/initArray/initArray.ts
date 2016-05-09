/// <reference path="./initArray.d.ts" />

/**
 * creates an array of specified length
 * fillArray :: Int Size => Any Value => Array
 *
 * Size: The size of the array
 * Value: if a function, the function will be run for each element
 *      (like a map function), passing the index. Anything else will
 *      just be assigned to each item of the array. Defaults to `null`
 *
 * Usage:
 *
 * ```
 * const arr = fillArray(6)(); //[null,null,null,null,null]
 * const arr2 = fillArray(2)(0); //[0,0];
 * const arr3 = fillArray(3),((i)=>i+1);//[1,2,3];
 * ```
 */


export const initArray:iArrayInitializer = function(fill?:any,size?:number):any{
	
	if(typeof fill == 'undefined'){fill=null;}
	
	function fillWith(size?:number):any[]{
		if(!size){return [];}
		if(typeof fill == 'function'){
			return Array.apply(null,Array(size)).map((_,i)=>fill(i));
		}
		return Array.apply(null, Array(size)).map(()=>fill);
	}
	
	if(arguments.length>1){return fillWith(fill);}
	return fillWith;
}
