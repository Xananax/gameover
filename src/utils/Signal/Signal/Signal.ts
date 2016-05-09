/// <reference path="./Signal.d.ts" />

import {SimpleEventDispatcher} from '../../SimpleEventDispatcher';

/****************************************************
 * CONSTANTS
****************************************************/

export const SKIP = Symbol('SKIP');
export const BREAK = Symbol('BREAK');

/****************************************************
 * UTILITIES
****************************************************/

export function isSignal(obj:any):boolean{
	return obj && obj.isSignal;
}

/****************************************************
 * PROCESS FILTERS AND MAP BEFORE TRIGGERING
****************************************************/

function processProcessors(processors:SignalProcessors,previous:any,value:any){
	const {length} = processors;
	let i = 0;
	while(i < length){
		const process = processors[i++];
		const ret = process(value,previous);
		if(ret == BREAK || ret instanceof Error){
			return BREAK;
		}
		if(ret == SKIP){
			continue;
		}
		previous = value;
		value = ret;
	}
	return value;
}

function triggerListeners(config:SignalConfig,processors:SignalProcessors,dispatchEvent:DispatchEventFunc,value:any){
	if(config.pause){return;}
	if(processors.length){
		const previous = config.value;
		const ret = processProcessors(processors,previous,value);
		if(ret == BREAK){return;}
		value = ret;
	}
	if(config.filterSimilar && value == config.value){return;}
	config.value = value;
	dispatchEvent(value);
}

/****************************************************
 * REMOVE LISTENERS & CLEANUP
****************************************************/

function dispose(processors:SignalProcessors,onDispose){
	processors.length = 0;
	onDispose.forEach(d=>d());
	onDispose.length = 0;
}

/****************************************************
 * FILTER AND MAP
****************************************************/

function map(processors:SignalProcessors,operation:SignalProcessor){
	processors.push(operation);
}

function mapSignal<IN,OUT>(parentSignal:Signal<any,IN>,operation:SignalProcessor):Signal<IN,any>{
	if(!operation || !(typeof operation == 'function')){
		throw new Error(`you have not provided a function`);
	}
	return createChildSignal(parentSignal,operation);
}

function createFilterFunction(operation:SignalProcessor):SignalProcessor{
	return function filter(value,previous){
		const ret = operation(value,previous);
		if(!ret){return BREAK;}
		return value;
	}
}

function filter(processors:SignalProcessors,operation:SignalProcessor){
	processors.unshift(createFilterFunction(operation));
}

function filterSignal<IN,OUT>(parentSignal:Signal<any,IN>,operation:SignalProcessor):Signal<IN,any>{
	if(!operation || !(typeof operation == 'function')){
		throw new Error(`you have not provided a function`);
	}
	return createChildSignal(parentSignal,createFilterFunction(operation));
}

/****************************************************
 * SUB-STREAMS
****************************************************/

export function addChildSignal<IN,OUT>(parentSignal:Signal<any,IN>,signal:Signal<IN,any>):Signal<IN,any>{
	const remove = parentSignal.add(signal.trigger);
	signal.onDispose.push(remove);
	return signal;	
}

export function createChildSignal<IN,OUT>(parentSignal:Signal<any,IN>,operation?:SignalProcessorOrArray):Signal<IN,any>{
	const create = parentSignal.create;
	const signal = create(parentSignal.value,operation,parentSignal,create);
	return addChildSignal(parentSignal,signal);
}

/****************************************************
 * FACTORY
****************************************************/

function getterSetter(config:SignalConfig){
	return function getSet<T>(propName){
		return {
			get:function():T{
				return config[propName];
			}
		,	set:function(n:T){
				config[propName] = n;
			}
		}
	}
}

const createSignal:SignalFactory<Signal<any,any>> = <SignalFactory<Signal<any,any>>>function <IN,OUT>(value?:any,operation?:SignalProcessorOrArray,parentSignal?:Signal<any,IN>,factory?:Function):Signal<IN,OUT>{
	if(isSignal(value)){return <Signal<any,any>>value;}
	if(typeof value == 'function'){
		operation = value;
		value = null;
	}
	factory = factory || createSignal;
	const {dispatchEvent,addEventListener:add,removeEventListener:remove,dispose:removeAllEvents} = SimpleEventDispatcher();
	const config:SignalConfig = {
		pause:false
	,	value
	,	filterSimilar:false
	};
	const processors:SignalProcessors = operation ? 
		(Array.isArray(operation) ? operation.slice() : [operation]) : []; 
	const onDispose:Function[] = [removeAllEvents];
	
	const trigger:(arg:IN)=>boolean = triggerListeners.bind(null,config,processors,dispatchEvent);
	const signal = <Signal<IN,OUT>>(parentSignal ? (value)=>parentSignal(value) : (value)=>trigger(value));
	
	function fork(operation?:SignalProcessorOrArray):Signal<OUT,any>{
		return createChildSignal<OUT,any>(<Signal<IN,OUT>>signal,operation);
	}
	
	function _map(operation?:SignalProcessor):Signal<OUT,any>{
		return mapSignal(<Signal<IN,OUT>>signal,operation);
	}
	
	function _filter(operation?:SignalProcessor):Signal<OUT,any>{
		return filterSignal(<Signal<IN,OUT>>signal,operation);
	}
	
	const getSet = getterSetter(config);
	
	Object.assign(
		signal
	,	{
			
			isSignal:true
		,	create:factory
		,	trigger
		,	processors
		,	add
		,	remove
		,	addFilter:filter.bind(null,processors)
		,	addMap:map.bind(null,processors)
		,	dispose:dispose.bind(null,processors,onDispose)
		,	map:_map
		,	reduce:_map
		,	filter:_filter
		,	fork
		,	onDispose
		}
	);
	
	Object.defineProperties(signal,{
		pause:getSet('pause')
	,	noDuplicates:getSet('filterSimilar')
	,	value:getSet('value')
	});
	
	return signal;
}

export default createSignal;