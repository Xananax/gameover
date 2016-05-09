import {Signal,isSignal,SKIP,BREAK} from '../Signal';

function runOperation(parentSignal,operation,combinedValue,key,value){
	if(!operation){return true;}
	const ret = operation(combinedValue,key,value);
	if(ret == SKIP || ret== BREAK){return false;}
	parentSignal(ret);
	return false;
}

function createTriggerForCombinedArray(parentSignal,deps,combinedValue,type,key,operation){
	return ( type == 'array' ?
		function triggerArray(value){
			if(value == SKIP || value == BREAK){return;}
			combinedValue = combinedValue.slice();
			combinedValue[key] = value;
			runOperation(parentSignal,operation,combinedValue,key,value) && parentSignal(combinedValue);
		} :
		function triggerObject(value){
			if(value == SKIP || value == BREAK){return;}
			combinedValue = Object.assign({},combinedValue,{[key]:value});
			runOperation(parentSignal,operation,combinedValue,key,value) && parentSignal(combinedValue);
		}	
	); 
	
}

export default function CombinedSignal<T>(signalsOrFunctions:SignalDependencies,operation?:SignalProcessor):CombinedSignal<T>{
	if(!signalsOrFunctions){throw new Error(`need dependencies to create a combined Signal`);}
	const type = Array.isArray(signalsOrFunctions) ? 'array' : 'object';
	
	const deps = (type == 'array') ? [] : Object.create(null);
	let combinedValue = (type == 'array') ? [] : Object.create(null);
	const keys = Object.keys(signalsOrFunctions);
	const parentSignal = <CombinedSignal<T>>Signal(combinedValue);
	
	keys.forEach(function(key){
		const curr = signalsOrFunctions[key];
		const signal = (!isSignal(curr)) ? Signal(curr) : curr;
		const trigger = createTriggerForCombinedArray(parentSignal,deps,combinedValue,type,key,operation); 
		signal.add(trigger);
		deps[key] = signal;
		combinedValue[key] = signal.value;
	});
	
	parentSignal.deps = deps;
	
	return parentSignal;
	
}