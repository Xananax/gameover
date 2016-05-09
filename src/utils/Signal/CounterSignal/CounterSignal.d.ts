/// <reference path="../Signal/Signal.d.ts" />

interface CounterSignal extends Signal<any,any>{
	increment(n?:number):CounterSignal;
	decrement(n?:number):CounterSignal;
	isCounterSignal:boolean;
	count:number;
}