interface iFillable{
	(size?:number):any[];
}

interface iArrayInitializer{
	(fill?:any):iFillable;
	(fill?:any,size?:number):any[];	
}
