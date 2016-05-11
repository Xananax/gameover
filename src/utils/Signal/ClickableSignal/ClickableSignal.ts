/// <reference path="./ClickableSignal.d.ts" />

import {InputSignal} from '../InputSignal';
import {onMouseDown,onMouseUp} from '../../pointerEvent';
import {addClass,removeClass} from '../../class';

const clsRemove = removeClass('is-on');
const clsAdd = addClass('is-on');

function onDown(s:InputSignal,remove:Function,evt:MouseEvent){
	remove();
	s(true);
}

function onUp(s:InputSignal,add:Function,evt:MouseEvent){
	add();
	s(false);
}

function addNode(s:InputSignal,onUp:EventListener,onDown:EventListener,node:HTMLElement){
	const add = clsAdd(node);
	const remove = clsRemove(node);
	s.onDispose.push(onMouseDown(node,onDown.bind(null,remove),false));
	s.onDispose.push(onMouseUp(node,onUp.bind(null,add),false));
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