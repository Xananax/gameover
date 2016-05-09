/// <reference path="./onClickTouch.d.ts" />

import {addEventListener} from '../addEventListener';

function common(names:string[],obj:Node,fn?:EventListener,useCapture?:boolean):any{
	
	const removeClick = addEventListener(obj,names[0],fn,useCapture);
	const removeTouch = addEventListener(obj,names[1],fn,useCapture);
	const removePointer = addEventListener(obj,names[2],fn,useCapture);
	
	const remove = function(){
		removeClick();
		removeTouch();
		removePointer();
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
	
	const removeDown = onMouseDown(obj,onDown,useCapture);
	const removeUp = onMouseUp(obj,onUp,useCapture);
	
	const remove = function(){
		removeDown();
		removeUp();
	}
	
}

export const onDoubleClick:iCommonDoubleClick = function(obj:Node,fn?:EventListener,options?:onDoubleClickOptions):any{
	
	if(arguments.length==1){return onDoubleClick.bind(this,obj);}
	
	const delay = (options && options.delay) || 150;
	const useCapture = (options && options.useCapture) || false;
	const max = (options && options.max) || 2;
	 
	let clicks = 0;
	let timer;
	const reset = () => {
		clicks = 0;
		clearTimeout(timer);
	}
	const inc = (evt) => {
		clicks++;
		if(clicks>=max){
			reset();
			fn(evt);
		}
	}
	const trigger:EventListener = function(evt){
		inc(evt);
		setTimeout(reset,200);
	}
	
	const remove = onClick(obj,fn,options);
	return remove;
}