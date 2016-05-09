interface onClickOptions{
	useCapture:boolean;
	distance:number;
	delay:number;
}

interface onDoubleClickOptions extends onClickOptions{
	max:number;
}

interface iCommonPointer{
	(obj:Node):(fn:EventListener,useCapture?:boolean)=>Function;
	(obj:Node,fn:EventListener):Function;
	(obj:Node,fn:EventListener,useCapture:boolean):Function;
}

interface iCommonClick{
	(obj:Node):(fn:EventListener,options?:onClickOptions)=>Function;
	(obj:Node,fn:EventListener):Function;
	(obj:Node,fn:EventListener,options?:onClickOptions):Function;
}

interface iCommonDoubleClick{
	(obj:Node):(fn:EventListener,options?:onDoubleClickOptions)=>Function;
	(obj:Node,fn:EventListener):Function;
	(obj:Node,fn:EventListener,options?:onDoubleClickOptions):Function;
}