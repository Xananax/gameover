interface iGetRandomValue{
	(rand?:Function):any
}

interface RandomProvider{
	(seed?:number):number;	
}


interface iGetRandomFromArray{
	(arr:Array<any>):iGetRandomValue;
	(arr:Array<any>,rand?:RandomProvider):any;	
}
