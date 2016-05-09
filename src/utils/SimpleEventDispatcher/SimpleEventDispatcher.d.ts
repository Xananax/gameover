interface SimpleEventListener{
	(arg:any):any
}

interface SimpleEventListenerObject{
	handleEvent:SimpleEventListener
}

type ValidListener = SimpleEventListener | SimpleEventListenerObject;

interface SimpleEventDispatcher{
	addEventListener(listener:ValidListener,once?:boolean):()=>boolean;
	removeEventListener(listener:ValidListener):boolean;
	dispatchEvent(arg?:any):boolean
	dispose():boolean
	size():number
}