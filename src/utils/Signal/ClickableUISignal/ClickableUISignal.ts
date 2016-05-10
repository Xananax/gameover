/// <reference path="./ClickableUISignal.d.ts" />

import {ClickableSignal} from '../ClickableSignal';
import {CombinedSignal} from '../CombinedSignal';

export function ClickableUISignal(nodesMap:HTMLElementsHash):CLickableUISignal<any>{

	const nodesEnum:NodesSignal = {};

	Object.keys(nodesMap).forEach(function(keyName){
		const nodes = nodesMap[keyName];
		const s = ClickableSignal(nodes);
		nodesEnum[keyName] = s;
	});
	

	
	const signal:CLickableUISignal<boolean> = <CLickableUISignal<boolean>>CombinedSignal(nodesEnum);
	
	return signal;
	
}