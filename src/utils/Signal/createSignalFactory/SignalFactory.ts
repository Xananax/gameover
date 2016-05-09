/// <reference path="./SignalFactory.d.ts" />

import {Signal} from '../Signal';

export default function createSignalFactory<SIGNAL>(mixins?:SignalFactoryMixins):SignalFactory<SIGNAL>{
	if(!mixins || !mixins.length){return <SignalFactory<any>>Signal;}
	const {length} = mixins;
	const signalFactory = function<IN,OUT>(
		value?:any
	,	operation?:SignalProcessorOrArray
	,	parentSignal?:Signal<any,IN>
	){
		const s = Signal(value,operation,parentSignal,signalFactory);
		let i = 0;
		while(i < length){
			const constructor = mixins[i++];
			constructor && constructor(s);
		}
		return s;
	}
	return signalFactory;
}