interface Node{
	attachEvent(type:string,callback:EventListener):void;
	detachEvent(type:string,callback:EventListener):void;
}

interface iRemoveEventListener{
	():boolean
}

interface iAddEventListener{
	(fn:EventListener,useCapture?:boolean):iRemoveEventListener
}

interface iSelectEventType{
	(type:string):iAddEventListener;
	(type:string,fn?:EventListener):iRemoveEventListener;
	(type:string,fn?:EventListener,useCapture?:boolean):iRemoveEventListener;
}

interface iSelectDom{
	(obj:Node|Window):iSelectEventType;
	(obj:Node|Window,type?:string):iAddEventListener;
	(obj:Node|Window,type?:string,fn?:EventListener):iRemoveEventListener;
	(obj:Node|Window,type?:string,fn?:EventListener,useCapture?:boolean):iRemoveEventListener;
}