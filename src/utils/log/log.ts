import {envIsDev} from '../envIsDev';

function printf(sentence:string,args?:Array<any>):string{
	if(!args){return sentence;}
	let i = 0;
	let {length} = args;
	if(!length){return sentence;}
	return sentence.replace(/%s/g,()=>((i>=length)?args[i]:args[i++]));
}

function noOp(sentence:string|Error,...args){}

let warn = noOp;
let log = noOp;
let error = noOp;

function makeLogFunction(logMethod:string,doThrow:boolean){
	return function(sentence:string|Error,...args){
		let message:string;
		let err:Error;
		if(sentence instanceof Error){
			message = sentence.message;
			err = sentence;
		}
		else{
			message = printf(sentence,args);
			err = new Error(message);
		}
		console[logMethod](message);
		if(doThrow){
			throw err;
		}else{
			try{throw err}catch(e){};	
		}
		
	}
}

if(envIsDev){
	warn = makeLogFunction('warn',false);
	log = makeLogFunction('log',false);
	error = makeLogFunction('error',true);
} 

export {
	printf
,	warn
,	log
,	error
}