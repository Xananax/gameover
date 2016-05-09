/// <reference path="./DebouncedSignal.d.ts" />
import {Signal} from '../Signal';
import {createSignalFactory} from '../createSignalFactory';

export function debounceSignal(signal:Signal<any,any>,delay?:number):DebouncedSignal<any,any>{
	
	let timer;
	const debouncedSignal = DebouncedSignalMixin(Signal(signal.value,null,null,DebouncedSignal));
	debouncedSignal.delay = (delay && delay > 0) ? delay : debouncedSignal.delay || 250;
	
	function stopTimer(){
		clearTimeout(timer);
	}
	function trigger(value){
		stopTimer();
		timer.setTimeout(()=>debouncedSignal(value),debouncedSignal.delay);
	}
	const remove = signal.add(trigger);
	debouncedSignal.onDispose.push(remove,stopTimer);
	return debouncedSignal;
}

export const DebouncedSignal:SignalFactory<DebouncedSignal<any,any>> = <SignalFactory<DebouncedSignal<any,any>>>createSignalFactory([DebouncedSignalMixin]);

export function DebouncedSignalMixin<IN,OUT>(s:Signal<any,any>):DebouncedSignal<IN,OUT>{
	if((<DebouncedSignal<any,any>>s).isDebounced){
		return <DebouncedSignal<any,any>>s;
	}
	Object.assign(s,{
		debounce:debounceSignal.bind(null,s)
	,	isDebounced:true
	,	delay:0
	});
	return <DebouncedSignal<IN,OUT>>s;
}