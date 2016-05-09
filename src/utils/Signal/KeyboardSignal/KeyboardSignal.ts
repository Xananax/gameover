/// <reference path="./KeyboardSignal.d.ts" />

import {InputSignal} from '../InputSignal';
import {Signal} from '../Signal';
import {CombinedSignal} from '../CombinedSignal';
import {addEventListener} from '../../addEventListener';

export function KeyboardSignal(keyMap:KeyboardSignalKeysMap):KeyboardHandlerSignal{

	const keysEnum:KeyboardSignalHash = {};
	const codesEnum:KeyboardSignalKeycodesHash = {};
	
	Object.keys(keyMap).forEach(function(keyName){
		keyMap[keyName].forEach((keyCode:number)=>{
			codesEnum[keyCode] = keyName;
		});
		keysEnum[keyName] = InputSignal(keyName);
	});
	
	const getSignalByKeyCode = function(keyCode:number):KeyboardSignal{
		if(!(keyCode in codesEnum)){return null;}
		const keyName = codesEnum[keyCode];
		const signal = keysEnum[keyName];
		return signal;		
	}
	
	const triggerSignalByKeyCode = function(keyCode:number,value:boolean):void{
		const signal = getSignalByKeyCode(keyCode);
		signal && signal(value);
	}
	
	const onPress:EventListener = (evt:KeyboardEvent) => triggerSignalByKeyCode(evt.keyCode,true);
	const onRelease:EventListener = (evt:KeyboardEvent) => triggerSignalByKeyCode(evt.keyCode,false);
	
	const removeKeyDown = addEventListener(window,'keydown',onPress,false);
	const removeKeyUp = addEventListener(window,'keyup',onRelease,false);
	
	const removeEventHandlers = function(){
		removeKeyDown();
		removeKeyUp();
	}
	
	const signal:KeyboardHandlerSignal = <KeyboardHandlerSignal>CombinedSignal(keysEnum);
	
	signal.onDispose.push(removeEventHandlers);
	
	return signal;
	
}