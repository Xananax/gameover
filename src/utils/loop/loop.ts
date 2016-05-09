/// <reference path="./loop.d.ts" />

/**
 * Loops over anything (arrays,objects,strings). Replaces "map" and "foreach";
 * Allows to break out of looping.
 * loop :: Object Source => Function Operator => Optional Object Target => Object Target|Source
 * loop :: String Source => Function Operator => Optional String Target => Object Target|Source
 * loop :: Array Source => Function Operator => Optional Array Target => Object Target|Source
 *
 * Source: The source object
 * Operator: A function to map values with. Receives (currentObject,key|index,sourceObject,previousValue,iterationIndex)
 *     currentObject: the current object property, array value, or string character being operated on
 *     key|index: either the array or string index, or the object key
 *     sourceObject: whatever was passed as 'Source'
 *     previousValue: The value of the previous iteration
 *     iterationIndex: The current index value. For arrays and strings, this will be equivalent to `key`
 * Target: An object to receive mappings from. If none provided, a default empty object, string, or array will be created.
 *
 * Note:
 *    - Since the operator function receives a previous value, it is possible to use this function as a reduce of sorts.
 *    - You can break out of a loop anytime by using loop.BREAK (or loop.CANCEL);
 *    - You can skip a value anytime by using loop.SKIP;
 *    - If the operator provoked no changes (all values were SKIP'ped or BREAK'd out of), the `source` object is returned
 *      this may be useful for comparing changes in state.
 *
 * Usage:
 *
 * ```
 * import loop,{SKIP,BREAK} from 'loop';
 *
 * const mammals = {fur:true,legs:4}
 * const makeMammal = loop(mammals);
 * const Cat = makeMammal((val)=>val)({ears:'pointy'});
 * const myCat = {name:'miao'};
 * loop(Cat)((val,key)=>(key=='ears' && val == 'pointy')?SKIP:val)(myCat); //my cat doesn't have pointy ears
 * ```
 */

export const CANCEL = {};
export const BREAK = CANCEL;
export const SKIP = {};

function _loop(source,length,operator,getKey,processValue):void{
	let changed = false;
	let previous = null;
	let i = 0;
	while(i<length){
		const key = getKey(i);
		const current = source[key];
		const value = operator(current,key,source,previous,i);
		previous = current;
		if(value == SKIP){i++;continue;}
		if(value == CANCEL){break;}
		processValue(value,key);
		i++;
	}
}

function getLengthKey(index){return index;}

const loopString:iLoopString = function(source:string,operator?:Function,target?:string,target2?:string):any{
	
	if(arguments.length==2){return loopString.bind(this,source,operator,null);}
	if(arguments.length==1){return loopString.bind(this,source);}
	
	const {length} = source;
	if(target2){
		target = target2;
	}
	target = target || '';
	const inPlace = (target == source);
	const processValue = (value,i)=>{
		target=inPlace ? 
			target.substr(0,i)+value+target.substr(i+1) : 
			target+value
		;
	}
	_loop(source,length,operator,getLengthKey,processValue);
	return target;
}

const loopObject:iLoopObject = function(source:Object,operator?:Function,target?:Object,target2?:Object):any{
	
	if(arguments.length==2){return loopObject.bind(this,source,operator,null);}
	if(arguments.length==1){return loopObject.bind(this,source);}
	
	if(target2){
		target = target2;
	}
	if(!target){
		target = {};
	}
	const keys  = Object.keys(source);
	const {length} = keys;
	let changed = false;
	const getKey = (index)=>keys[index];
	const processValue = (value,key) =>{
		target[key] = value;
		changed = true;
	}
	_loop(source,length,operator,getKey,processValue);
	return changed ? target : source;
}

const loopArray:iLoopArray = function(source:any[],operator?:Function,target?:any[],target2?:any[]):any{

	if(arguments.length==2){return loopArray.bind(this,source,operator,null);}
	if(arguments.length==1){return loopArray.bind(this,source);}
	
	const {length} = source;
	
	if(target2){
		target = target2;
	}
	if(!target){
		target = [];
	}
	const inPlace = source == target;
	let changed = false;
	
	const processValue = (value,index) => {
		if(inPlace){target[index] = value;}
		else{target.push(value);}
		changed = true;
	}
	
	_loop(source,length,operator,getLengthKey,processValue);
	return changed ? target : source;
}


const TYPE_ARRAY = 'TYPE_ARRAY';
const TYPE_STRING = 'TYPE_STRING';
const TYPE_OBJECT = 'TYPE_OBJECT';

export const loop:iLoop = <iLoop>function(source:Loopable,operator?:Function,target?:Loopable):any{
	if(!source){throw new Error('source for loop cannot be empty');}
	const func:Function = Array.isArray(source) ? loopArray : (typeof source == 'string') ? loopString : loopObject;
	if(arguments.length==3){return func(source,operator,target);}
	if(arguments.length==2){return func(source,operator);}
	if(arguments.length==1){return func(source);}
}

loop.BREAK = BREAK;
loop.CANCEL = CANCEL;
loop.SKIP = SKIP;