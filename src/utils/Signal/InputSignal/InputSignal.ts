/// <reference path="./InputSignal.d.ts" />

import {Signal,BREAK,SKIP} from '../Signal';
import {now} from '../../now';

export const InputSignal:SignalFactory<InputSignal> = function(on:boolean=false,operation?:SignalProcessorOrArray,parentSignal?:Signal<any,any>,factory?:SignalFactory<any>):InputSignal{
	const value:InputSignalValue = {
		name
	,	start:0
	,	stop:now()
	,	on:on
	};
	function filter(on){
		if(on==null){
			return BREAK;
		}
		if(on!=value.on){
			return on;
		}
		return BREAK;
	}
	function transform(on){
		if(on){
			value.start = now();
			value.stop = 0;
		}else{
			value.start = 0;
			value.stop = now();
		}
		value.on = on;
		return value;
	}
	const s = Signal(value,null,parentSignal,factory);
	s.processors.push(filter,transform);
	if(operation){
		if(Array.isArray(operation)){
			s.processors.push(...operation);
		}else{
			s.processors.push(operation);
		}
	}
	return s;
}