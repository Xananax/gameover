/// <reference path="./CounterSignal.d.ts" />

import {
	Signal
,	addChildSignal
} from '../Signal';
import {
	createSignalFactory
} from '../createSignalFactory';

export const CounterSignal:SignalFactory<CounterSignal> = <SignalFactory<CounterSignal>>createSignalFactory([CounterSignalMixin]); 

export function countSignal(s:Signal<any,any>,inc:number):CounterSignal{
	function trigger(value,previousValue){
		return previousValue+inc;
	}
	const subSignal = CounterSignalMixin(Signal(0,trigger));
	const remove = s.add(subSignal);
	subSignal.onDispose.push(remove);
	return subSignal;
}
export function incrementSignal(s:Signal<any,any>){
	return countSignal(s,1);
}

export function decrementSignal(s:Signal<any,any>){
	return countSignal(s,-1);
}

export function CounterSignalMixin(s:Signal<any,any>):CounterSignal{
	if((<CounterSignal>s).isCounterSignal){
		return <CounterSignal>s;
	}
	const counterSignal = <CounterSignal>s;
	Object.assign(counterSignal,{
		count:countSignal.bind(null,counterSignal)
	,	increment:incrementSignal.bind(null,counterSignal)
	,	decrement:decrementSignal.bind(null,counterSignal)
	});
	return counterSignal;
}