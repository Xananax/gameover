/// <reference path="./removeEventListener.d.ts" />

/* cross platform DOM Remove Event Listener
 * The IE version only works as a counterpart to the `addeventlistener` (i.e, will not remove event you added without using the addEventListener provided).
 * Inspiration from: http://ejohn.org/projects/flexible-javascript-events/
 *
 * RemoveEventListener ::  DOMObject -> String -> Function -> Boolean
 * 
 * DOMObject: Any valid dom object
 * String: Any valid event type ('click','keyup',...)
 * Function: Function you used when adding the event
 * Boolean: True if the event listener was successfully removed (always true).
 *
 * Example:
 * ```
 * RemoveEventListener(document)('click')(fn);
 * ```
 */

const detachEvent:iSelectDom = function(obj:Node|Window,type?:string,fn?:EventListener):any{

	function selectEventType(type:string,fn?:EventListener):Function|boolean{

		const evtName = `on${type}`;

		function remove(fn:EventListener){	
			const evtKey = `${type}${fn}`;
			const fnHash = `e${type}${fn}`;
			obj.detachEvent(evtName,obj[evtKey]);
			obj[evtKey] = null;
			obj[fnHash] = null;
			return true;
		}

		if(arguments.length>1){return remove(fn);}
		return remove;
	}
	//manual currying to cache the dom object lookup
	if(arguments.length>2){return selectEventType(type,fn);}
	if(arguments.length>1){return selectEventType(type);}
	return selectEventType;
}

const nativeRemoveEventListener:iSelectDom = function(obj:Node|Window,type?:string,fn?:EventListener,useCapture?:boolean):any{

	useCapture = (typeof useCapture == 'boolean') ? useCapture : false;

	function selectEventType(type:string,fn?:EventListener,useCapture?:boolean):Function|boolean{

		useCapture = (typeof useCapture == 'boolean') ? useCapture : false;

		function remove(fn:EventListener,useCapture?:boolean):boolean{			
			useCapture = (typeof useCapture == 'boolean') ? useCapture : false;
			obj.removeEventListener(type,fn,useCapture);
			return true;
		}

		if(arguments.length>1){return remove(fn,useCapture);}
		return remove;
	}

	//manual currying to cache the dom object lookup
	if(arguments.length>2){return selectEventType(type,fn,useCapture);}
	if(arguments.length>1){return selectEventType(type);}
	return selectEventType;
}

export const removeEventListener = ('removeEventListener' in document) ? nativeRemoveEventListener : detachEvent;
