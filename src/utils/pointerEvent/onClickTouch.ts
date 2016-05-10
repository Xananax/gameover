/// <reference path="./onClickTouch.d.ts" />

import {addEventListener} from '../addEventListener';

function common(names:string[],obj:Node,fn?:EventListener,useCapture?:boolean):any{
	
	const removeClick = (names[0] && addEventListener(obj,names[0],fn,useCapture));
	const removeTouch = (name[1] && addEventListener(obj,names[1],fn,useCapture));
	const removePointer = (name[2] && addEventListener(obj,names[2],fn,useCapture));
	
	const remove = function(){
		removeClick && removeClick();
		removeTouch && removeTouch();
		removePointer && removePointer();
	}
	
	return remove;
	
}

export const onMouseUp:iCommonPointer = function(obj:Node,fn?:EventListener,useCapture?:boolean):any{
	
	if(arguments.length==1){return onMouseUp.bind(this,obj);}
	return common(['mouseup','touchend','pointerup'],obj,fn,useCapture);
	
}

export const onMouseDown:iCommonPointer = function(obj:Node,fn?:EventListener,useCapture?:boolean):any{
	
	if(arguments.length==1){return onMouseUp.bind(this,obj);}
	return common(['mousedown','touchstart','pointerdown'],obj,fn,useCapture);
	
}

export const onMouseMove:iCommonPointer = function(obj:Node,fn?:EventListener,useCapture?:boolean):any{
	
	if(arguments.length==1){return onMouseMove.bind(this,obj);}
	return common(['mousemove','touchmove','pointermove'],obj,fn,useCapture);
	
}


export const onClick:iCommonClick = function(obj:Node,fn?:EventListener,options?:onClickOptions):any{
	
	if(arguments.length==1){return onClick.bind(this,obj);}
	
	const distance = (options && 'distance' in options) ? options.distance : 10;
	const useCapture = (options && options.useCapture) || false;
	const delay = (options && options.delay) || 0;  
	let x:number = 0;
	let y:number = 0;
	let wasDown:boolean = false;
	let timer;
	function reset(){
		x=0;y=0;wasDown=false;
	}
	function onDown(evt){
		clearTimeout(timer);
		if(distance){
			x=evt.pageX;
			y=evt.pageY;			
		}
		wasDown = true;
	}
	function onUp(evt){
		if(wasDown){
			if(distance){
				const distX = evt.pageX - x;
				const distY = evt.pageY - y;
				if(distX < distance || distY < distance){
					if(delay){
						timer = setTimeout(()=>fn(evt),delay);
					}else{
						fn(evt);
					}
				}	
			}else{
				fn(evt);
			}

		}
		reset();
	}
	function onClick(evt){
		onDown(evt);
		onUp(evt);
	}
	
	
	const removeDown = common([null,'touchstart','pointerdown'],obj,onDown,useCapture); 
	const removeUp = common([null,'touchend','pointerup'],obj,onUp,useCapture)
	const removeClick = addEventListener(obj,'click',onClick,useCapture);
	
	const remove = function(){
		removeDown();
		removeUp();
		removeClick();
	}
	
}

export const onDoubleClick:iCommonDoubleClick = function(obj:Node,fn?:EventListener,options?:onDoubleClickOptions):any{
	
	if(arguments.length==1){return onDoubleClick.bind(this,obj);}
	
	const delay = (options && options.delay) || 150;
	const useCapture = (options && options.useCapture) || false;
	const max = (options && options.max) || 2;
	 
	let clicks = 0;
	let timer;
	const done = (evt) => {
		reset();
		fn(evt);
	}
	const reset = () => {
		clicks = 0;
		clearTimeout(timer);
	}
	const inc = (evt) => {
		clicks++;
		if(clicks>=max){
			done(evt);
		}
	}
	const trigger:EventListener = function(evt){
		inc(evt);
		setTimeout(reset,200);
	}
	
	const removeSimulatedClick = onClick(obj,trigger,options);
	const removeDoubleClick = addEventListener(obj,'dblclick',done,useCapture);
	const remove = function(){
		removeSimulatedClick();
		removeDoubleClick();
	}
	return remove;
}