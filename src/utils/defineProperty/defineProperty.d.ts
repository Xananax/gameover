interface iConfigSetter{
	(config?:Object):Object;
}

interface iPropertyCreator{
	(flags:number):iConfigSetter;
	(flags:number,config?:Object):Object;
}

interface iAddProperty{
	(propName:string,value?:any,getterSetter?:Object):Object;
}

interface iSelectObject{
	(obj:Object):iAddProperty;
	(obj:Object,propName:string):Object;
	(obj:Object,propName:string,value?:any):Object;
	(obj:Object,propName:string,value?:any,getterSetter?:Object):Object;
}

interface iPropertyDefiner{
	(flags:number):iSelectObject;
	(flags:number,obj:Object):iAddProperty;
	(flags:number,obj?:Object,propName?:string,value?:any,getterSetter?:Object):Object;
}