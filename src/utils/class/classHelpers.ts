/// <reference path="./classHelpers.d.ts" />

export function classNameRegExp(className:string):RegExp{
	if(!className){
		throw new TypeError(`${className} is required`);
	}
	return (new RegExp('(\\s|^)'+className+'(\\s|$)'));
}

function checkIfNode(node:HTMLElement){
	if(!node){throw new TypeError(`${node} is required`);}
	if(!('className' in node)){throw new TypeError(`${node} is not an HMTL Element`);}
}

function _hasClass(regexp:RegExp,node:HTMLElement):boolean{
	return !!node.className.match(regexp);
}

export function hasClass(className:string):SelectElementForCheck
export function hasClass(className:string,node:HTMLElement):CheckIfElement
export function hasClass(className:string,node?:HTMLElement):CheckIfElement|SelectElementForCheck{
	const cls = classNameRegExp(className);
	if(arguments.length==1){
		return _hasClass.bind(null,cls);
	}
	checkIfNode(node);
	return _hasClass.bind(null,cls,node);
}

function _addClass(hasClass:Function,className:string,node:HTMLElement):HTMLElement{
	if(!hasClass()){
		node.className+=(" "+className);
	}
	return node;
}

export function addClass(className:string):SelectElementForClassOperation;
export function addClass(className:string,node:HTMLElement):OperateWithElement;
export function addClass(className:string,node?:HTMLElement):SelectElementForClassOperation|OperateWithElement{
	if(!className){throw new TypeError(`${className} is required`);}
	if(arguments.length==1){
		return addClass.bind(this,className);
	}
	checkIfNode(node);
	const _has = hasClass(className,node);
	return _addClass.bind(null,_has,className,node);
}

function _removeClass(cls:RegExp,node:HTMLElement):HTMLElement{
	if(_hasClass(cls,node)){
		node.className=node.className.replace(cls,' ');
	}
	return node;
}

export function removeClass(className:string):SelectElementForClassOperation;
export function removeClass(className:string,node:HTMLElement):OperateWithElement;
export function removeClass(className:string,node?:HTMLElement):SelectElementForClassOperation|OperateWithElement{
	const cls = classNameRegExp(className);
	if(arguments.length==1){
		return removeClass.bind(this,cls);
	}
	checkIfNode(node);
	return _removeClass.bind(this,cls,node)
}