/// <reference path="../Signal/Signal.d.ts" />
/// <reference path="./MergedSignal.d.ts" />

import {Signal,addChildSignal} from '../Signal';
import {createSignalFactory} from '../createSignalFactory';

export function merge(signal:Signal<any,any>,signals:Signal<any,any>[]){
	signals.forEach(function(s:Signal<any,any>){
		const remove = s.add(signal);
		signal.onDispose.push(remove);
	});
	return signal;
}

export const MergedSignal:SignalFactory<MergedSignal> = <SignalFactory<MergedSignal>>createSignalFactory([MergedSignalMixin]); 

export function MergedSignalMixin(s?:Signal<any,any>,signals?:Signal<any,any>[]):MergedSignal{
	s  = s || Signal(0,null,null,MergedSignal);
	
	const mergedSignal = <MergedSignal>s;
	const create = mergedSignal.create; 
	
	if(signals && signals.length){
		merge(mergedSignal,signals);
	}
	
	if(!('merge' in mergedSignal)){
		mergedSignal.merge = merge.bind(null,mergedSignal);	
	}
	
	return mergedSignal;
}