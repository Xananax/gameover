/// <reference path="../Signal/Signal.d.ts" />

interface CombinedSignal<OUT> extends Signal<Array<any>|Object,OUT>{
	deps:SignalDependencies
}

interface SignalsArray extends Array<any>{
	[index:number]:Signal<any,any>;
}

interface SignalsObject{
	[index:string]:Signal<any,any>;
}

type SignalDependencies = SignalsArray | SignalsObject;