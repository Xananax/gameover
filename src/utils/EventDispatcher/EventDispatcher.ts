/// <reference path="./EventDispatcher.d.ts" />

import {SimpleEventDispatcher} from '../SimpleEventDispatcher'; 

function addEventListener(eventsListeners:EventsHandlers,type:string,listener:EventListenerOrEventListenerObject):()=>boolean{
	if(!eventsListeners[type]){
		eventsListeners[type] = SimpleEventDispatcher();	
	}
	return eventsListeners[type].addEventListener(listener);
}

function removeEventListener(eventsListeners:EventsHandlers,type:string,listener:EventListenerOrEventListenerObject):boolean{
	if(!eventsListeners[type] || !eventsListeners[type].size()){return;}
	return eventsListeners[type].removeEventListener(listener);
}

function dispatchEvent(eventsListeners:EventsHandlers,evt?:any):boolean{
	const {type} = evt;
	if(!eventsListeners[type] || !eventsListeners[type].size()){return false;}
	return eventsListeners[type].dispatchEvent(evt);
}

export const EventDispatcher:EventDispatcherFactory = function(target?:any):MultiEventDispatcher{
	if(!target){target = Object.create(null);}
	const eventsListeners:EventsHandlers = {}
	return Object.assign(target,{
		addEventListener:addEventListener.bind(null,eventsListeners)
	,	removeEventListener:removeEventListener.bind(null,eventsListeners)
	,	dispatchEvent:dispatchEvent.bind(null,eventsListeners)
	});
}


	

