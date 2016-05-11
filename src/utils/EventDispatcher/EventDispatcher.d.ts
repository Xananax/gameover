/// <reference path="../SimpleEventDispatcher/SimpleEventDispatcher.d.ts" />

interface EventsHandlers{
	[key:string]:SimpleEventDispatcher
}

interface MultiEventDispatcher{
	addEventListener(type:string,listener:EventListenerOrEventListenerObject):()=>boolean;
	removeEventListener(type:string,listener:EventListenerOrEventListenerObject):boolean;
	dispatchEvent(evt?:any):boolean;
}

interface EventDispatcherFactory{
	(target?:any):MultiEventDispatcher
}