/// <reference path="./KeyboardLayout.d.ts" />

import * as layouts from './layouts';

export const KeyboardLayout:KeyboardLayoutProvider = function(layoutName?:string){
	const layout = (layoutName && (layoutName in layouts)) ? layouts[layoutName] : layouts.qwerty;
	return function(keyName:string):number{
		const keyCode = layout[keyName];
		if(keyCode == null){return null;}
		return keyCode;
	}
}
