/// <reference path="./SimpleEventDispatcher.d.ts" />

function makeOnce(listeners:ValidListener[],listener:ValidListener){
	return function wrappedListener(arg:any){
		runListener(listener,arg);
		removeListener(listeners,wrappedListener);
	}
}

export function isValidListener(listener:any):boolean{
	return listener && (
		(typeof listener == 'function') ||
		('handleEvent' in listener && typeof listener.handleEvent == 'function')
	)
}

function addListener(listeners:ValidListener[],listener:ValidListener,once?:boolean){
	if(!isValidListener(listener)){
		throw new Error(`${listener} is not a valid listener`);
	}
	if(once){
		listener = makeOnce(listeners,listener);
	}
	listeners.push(listener);
	return removeListener.bind(null,listeners,listener);
}

function removeListener(listeners:ValidListener[],listener:ValidListener):boolean{
	const index = listeners.indexOf(listener);
	if(index < 0){return false;}
	listeners.splice(index,1);
	return true;
}

function runListener(listener:ValidListener,arg:any){
	if((<SimpleEventListenerObject>listener).handleEvent){
		(<SimpleEventListenerObject>listener).handleEvent(arg);
	}else{
		(<SimpleEventListener>listener)(arg);
	}
}

function dispatchEvent(listeners:ValidListener[],arg?:any):boolean{
	const {length} = listeners;
	if(!length){return false;}
	let i = 0;
	while(i < length){
		const listener = listeners[i++];
		listener && runListener(listener,arg);
	}
	return true;
}

function dispose(listeners:ValidListener[]):boolean{
	listeners.length = 0;
	return true;
}

function size(listeners:ValidListener[]):number{
	return listeners.length;
}

export function SimpleEventDispatcher(target?:Object):SimpleEventDispatcher{
	const listeners:ValidListener[] = [];
	const dispatcher = Object.assign(
		target || Object.create(null)
	,	{
			addEventListener:addListener.bind(null,listeners)
		,	removeEventListener:removeListener.bind(null,listeners)
		,	dispatchEvent:dispatchEvent.bind(null,listeners)
		,	dispose:dispose.bind(null,listeners)
		,	size:size.bind(null,listeners)
		}
	);
	return dispatcher;
}