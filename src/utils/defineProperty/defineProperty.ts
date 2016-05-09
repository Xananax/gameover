/// <reference path="./defineProperty.d.ts" />

export const WRITABLE = 1<<0;
export const CONFIGURABLE = 1<<1;
export const VISIBLE = 1<<2;
export const OVERRIDE = 1<<3;
export const ENUMERABLE = VISIBLE;
export const EDITABLE = WRITABLE | CONFIGURABLE;
export const REGULAR = OVERRIDE|EDITABLE|VISIBLE;
export const DEFAULT_FLAGS = OVERRIDE|EDITABLE;


export const createPropertyConfiguration = function(flags:number=DEFAULT_FLAGS,config?:Object):PropertyDescriptor{

	if(flags==null){flags = DEFAULT_FLAGS;}
	
	if(arguments.length<2){
		return createPropertyConfiguration.bind(this,flags);
	}

	const enumerable:boolean = !!(flags & VISIBLE);
	const writable:boolean = !!(flags & WRITABLE);
	const configurable:boolean = !!(flags & CONFIGURABLE);	

	if(config==null){
		return {enumerable,configurable,writable};
	}
	if('set' in config || 'get' in config){
		return Object.assign({enumerable,configurable},config);	
	}
	return Object.assign({enumerable,configurable,writable},config);	
}


export const defineProperty:iPropertyDefiner = function(flags:number,obj?:Object,propName?:string,value?:any,getterSetter?:Object):any{
	
	if(flags == null){flags = DEFAULT_FLAGS;}
	
	if(!arguments.length || arguments.length==1){return defineProperty.bind(this,flags);}
	if(arguments.length==2){return defineProperty.bind(this,flags,obj);}
	
	if(!obj){throw new Error('no object selected');}
	if(!(flags & OVERRIDE) && (propName in obj)){
		throw new Error(`${propName} already exists in object and defineProperty is not set to override`);
	}

	if(getterSetter){
		if(!('get' in getterSetter) && !('set' in getterSetter)){
			throw new Error('defineGetterSetter needs an object with at least one of `get` or `set` properties');
		}
		const config = createPropertyConfiguration(flags,createGetterSetter(value,getterSetter));
		Object.defineProperty(obj,propName,config);
		return obj;
	}

	const config = createPropertyConfiguration(flags,{value});
	Object.defineProperty(obj,propName,config);
	return obj;		
}

function createGetterSetter(value,getterSetter):Object{
	const config:any = {};
	if('set' in getterSetter){
		const oldSet = getterSetter.set;
		config.set = function(arg){
			value = oldSet.call(this,arg);
		}
	}
	if('get' in getterSetter){
		const oldGet = getterSetter.get;
		config.get = function(){
			return oldGet.call(this,value);
		}
	}
	return config;
}