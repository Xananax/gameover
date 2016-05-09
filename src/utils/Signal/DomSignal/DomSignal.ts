/// <reference path="./DomSignal.d.ts" />

import {Signal} from '../Signal';
import {addEventListener} from '../../addEventListener'
import {isHTMLElement} from '../../isHTMLElement';


export function DomSignal(dom:HTMLElement):DomSignal;
export function DomSignal(dom:HTMLElement,type:string):DomEventSignal;
export function DomSignal(dom:HTMLElement,type?:string):DomEventSignal | DomSignal{
	
	if(!dom || !isHTMLElement(dom)){
		throw new Error(`\`${dom}\` is not an HTML Element`);
	}
	
	const domHandler = addEventListener(dom);
	const signal = <DomSignal>Signal(dom);
	const hash:DomEventSignalsHash = {};
	function on(type:string):DomEventSignal{
		if(!type || typeof type != 'string'){throw new Error(`\`${type}\` is not a string`);}
		if(!hash[type]){
				const s = Signal();
			const removeDomHandler = domHandler(type);
			const dispose = s.dispose;
			s.add(signal);
			s.onDispose.push(removeDomHandler);
			signal.onDispose.push(dispose);
			hash[type] = s;	
		}
		return hash[type];
	}
	
	if(type){return on(type);}
	
	signal.on = on;
	return signal;
	
}