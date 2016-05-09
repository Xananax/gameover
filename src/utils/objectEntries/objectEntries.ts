/// <reference path="./objectEntries.d.ts" />

export const objectEntries = function(obj:Object):CustomIteratableIterator{
	
	if(!obj){throw new Error(`\`${obj}\` is not an object`);}
	
	let index = 0;

	const propKeys = Reflect.ownKeys(obj);

	const next = function():CustomIteratorResult{
		if (index < propKeys.length){
			const key = propKeys[index];
			const done = false;
			const current = obj[key];
			const value = [key,current];
			index++;
			return {value,done};
		} else {
			const done = true;
			return {value:undefined,done};
		}
	}

	const iterator:CustomIteratableIterator = {
		[Symbol.iterator](){return this;}
	,	next
	};
	
	return iterator;
}