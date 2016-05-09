/// <reference path="../Signal/Signal.d.ts" />

interface DebouncedSignal<IN,OUT> extends Signal<IN,OUT>{
	debounce(delay?:number):DebouncedSignal<any,any>;
	isDebounced:boolean;
	delay:number;
}