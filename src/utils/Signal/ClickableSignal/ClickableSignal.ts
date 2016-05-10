/// <reference path="./ClickableSignal.d.ts" />

import {InputSignal} from '../InputSignal';
import {onMouseDown,onMouseUp} from '../../pointerEvent';
import {addClass,removeClass} from '../../class';

function onDown(s:InputSignal,evt:MouseEvent){
	const el = <HTMLElement>evt.target;
	addClass(el,'is-on');
	s(true);
}

function onUp(s:InputSignal,evt:MouseEvent){
	const el = <HTMLElement>evt.target;
	removeClass(el,'is-on');
	s(false);
}

function addNode(s:InputSignal,onUp:EventListener,onDown:EventListener,node:HTMLElement){
	s.onDispose.push(onMouseDown(node,onDown,false));
	s.onDispose.push(onMouseUp(node,onUp,false));
}

export function ClickableSignal(node:HTMLElement|HTMLElement[],startValue:boolean=false):ClickableSignal{

	const s = InputSignal(startValue,'click');
	
	const _onDown = onDown.bind(null,s);
	const _onUp = onUp.bind(null,s); 
	
	if(Array.isArray(node)){
		node.forEach((n)=>addNode(s,_onUp,_onDown,n));
	}else{
		addNode(s,_onUp,_onDown,node);
	}
	
	return s;
	
}