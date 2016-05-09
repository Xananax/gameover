interface iRemoveEventListener{
	(fn:EventListener,useCapture?:boolean):iRemoveEventListener
}

interface iSelectEventType{
	(type:string):iRemoveEventListener;
	(type:string,fn?:EventListener):iRemoveEventListener;
	(type:string,fn?:EventListener,useCapture?:boolean):iRemoveEventListener;
}

interface iSelectDom{
	(obj:Node|Window):iSelectEventType;
	(obj:Node|Window,type?:string):iRemoveEventListener;
	(obj:Node|Window,type?:string,fn?:EventListener):iRemoveEventListener;
	(obj:Node|Window,type?:string,fn?:EventListener,useCapture?:boolean):iRemoveEventListener;
}