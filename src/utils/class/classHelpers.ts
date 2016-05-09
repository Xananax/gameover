/// <reference path="./classHelpers.d.ts" />


export function hasClass(node:HTMLElement):OperateWithClass<boolean>;
export function hasClass(node:HTMLElement,cls:string):boolean;
export function hasClass(node:HTMLElement,cls?:string):any{
	if(arguments.length==1){
		return hasClass.bind(this,node);
	}
	return !!node.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

export function addClass(node:HTMLElement):OperateWithClass<void>;
export function addClass(node:HTMLElement,cls:string):void;
export function addClass(node:HTMLElement,cls?:string):any{
	if(arguments.length==1){
		return addClass.bind(this,node);
	}
	if(!hasClass(node,cls)){
		node.className += " "+cls;
	}
}

export function removeClass(node:HTMLElement):OperateWithClass<void>;
export function removeClass(node:HTMLElement,cls:string):void;
export function removeClass(node:HTMLElement,cls?:string):any{
	if(arguments.length==1){
		return removeClass.bind(this,node);
	}
	if(hasClass(node,cls)){
		const reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		node.className=node.className.replace(reg,' ');
	}
}