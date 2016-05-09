interface Signal<IN,OUT>{
	(arg?:IN):void;
	trigger(arg?:any):void;
	add(listener:SimpleEventListener,once?:boolean):()=>boolean;
	remove(listener:SimpleEventListener):boolean;
	value:OUT;
	map(processor:SignalProcessor):Signal<any,any>;
	filter(processor:SignalProcessor):Signal<any,any>;
	reduce(processor:SignalProcessor):Signal<any,any>;
	fork():Signal<any,any>;
	isSignal:boolean;
	dispose():boolean;
	onDispose:Function[];
	create:SignalFactory<Signal<IN,OUT>>;
	pause:boolean;
	noDuplicates:boolean;
	processors:SignalProcessors;
}


interface SignalFactory<SIGNAL>{
	(value?:any,operation?:SignalProcessorOrArray,parentSignal?:Signal<any,any>,factory?:SignalFactory<any>):SIGNAL
}


interface SignalConfig{
	pause:boolean
,	value:any
,	filterSimilar:boolean
}

interface SignalProcessor{
	(arg:any,previous:any):any;
}

interface InternalCallback{
	(err:Error,value:any):void;
}

interface DispatchEventFunc{
	(val:any):void;
}

type SignalProcessors = SignalProcessor[];
type SignalProcessorOrArray = SignalProcessor|SignalProcessors;
