interface iLoopToString{
	(target?:string):string;
}

interface iLoopWithString{
	(operator:Function):iLoopToString;
	(operator:Function,target?:string):string;
}

interface iLoopString{
	(source:string):iLoopWithString;
	(source:string,operator?:Function):iLoopToString;
	(source:string,operator?:Function,target?:string):string;
}

interface iLoopToObject{
	(target?:Object):Object;
}

interface iLoopWithObject{
	(operator:Function):iLoopToObject;
	(operator:Function,target?:Object):Object;
}

interface iLoopObject{
	(source:Object):iLoopWithObject;
	(source:Object,operator?:Function):iLoopToObject;
	(source:Object,operator?:Function,target?:Object):Object;	
}

interface iLoopToArray{
	(target?:any[]):any[];
}

interface iLoopWithArray{
	(operator:Function):iLoopToArray;
	(operator:Function,target?:any[]):any[];
}

interface iLoopArray{
	(source:any[]):iLoopWithArray;
	(source:any[],operator?:Function):iLoopToArray;
	(source:any[],operator?:Function,target?:any[]):any[];
}

type Loopable = string|Object|any[];

interface iLoop{
	(source:any[]):iLoopWithArray;
	(source:any[],operator?:Function):iLoopToArray;
	(source:any[],operator?:Function,target?:any[]):any[];
	(source:Object):iLoopWithObject;
	(source:Object,operator?:Function):iLoopToObject;
	(source:Object,operator?:Function,target?:Object):Object;
	(source:string):iLoopWithString;
	(source:string,operator?:Function):iLoopToString;
	(source:string,operator?:Function,target?:string):string;
	BREAK:Object;
	CANCEL:Object;
	SKIP:Object;
}