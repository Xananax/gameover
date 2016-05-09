/// <reference path="./addEventListener.d.ts" />

import {noOp} from '../noOp';
import {validEvents} from './validEvents';
import {envIsDev} from '../envIsDev';
import {warn} from '../log'

/* cross platform DOM Event listener
 * Inspiration from: http://ejohn.org/projects/flexible-javascript-events/
 * 
 * AddEventListener ::  DOMObject -> String -> (Event) -> Function -> booleanean
 * 
 * DOMObject: Any valid dom object
 * String: Any valid event type ('click','keyup',...)
 * Function: Function that runs when the event fires. Receives an Event Object.
 * Event: A DOM Event. Depends on the browser and type of event.
 * Function: Function to run to stop listening
 * booleanean: Always true
 *
 * Example:
 * ```
 * const dispose = AddEventListener(document)('click')((evt)=>console.log(evt));
 * const disposed = dispose();
 * ```
 */



const attachEvent:iSelectDom = function(obj:Node|Window,type?:string,fn?:EventListener):any{

	function selectEventType(type:string,fn?:EventListener):Function{

		if(envIsDev && !(type in validEvents)){warn(new Error(`\`${type}\` is not a valid event type`));}

		const evtName:string = `on${type}`;

		function attachEvent(fn:EventListener):Function{

			const evtKey:string = `${type}${fn}`;
			const fnHash:string = `e${type}${fn}`;
			obj[fnHash] = fn;
			obj[evtKey] = ()=>obj[fnHash](window.event);
			obj.attachEvent(evtName,obj[evtKey]);

			function detachEvent():boolean{
				obj.detachEvent(evtName,obj[evtKey]);
				obj[evtKey] = null;
				obj[fnHash] = null;
				return true;
			};
			return detachEvent;
		}
		if(arguments.length>1){return attachEvent(fn);}
		return attachEvent;
	};

	//manual currying to cache the dom object lookup
	if(arguments.length>2){return selectEventType(type,fn);}
	if(arguments.length>1){return selectEventType(type);}
	return selectEventType;
}

const nativeAddEventListener:iSelectDom = function(obj:Node|Window,type?:string,fn?:EventListener,useCapture?:boolean):any{

	useCapture = (typeof useCapture == 'boolean') ? useCapture : false;

	function selectEventType(type:string,fn?:EventListener,useCapture?:boolean):Function{

		if(envIsDev && !(type in validEvents)){warn(new Error(`\`${type}\` is not a valid event type`));}
			
		useCapture = (typeof useCapture == 'boolean') ? useCapture : false;

		function addFunction(fn:EventListener,useCapture:boolean):Function{

			useCapture = (typeof useCapture == 'boolean') ? useCapture : false;

			obj.addEventListener(type,fn,useCapture);

			function removeEventListener():boolean{
				obj.removeEventListener(type,fn,useCapture);
				return true;
			}
			
			return removeEventListener;
		}
		if(arguments.length>1){return addFunction(fn,useCapture);}
		return addFunction;
	}

	//manual currying to cache the dom object lookup
	if(arguments.length>2){return selectEventType(type,fn,useCapture);}
	if(arguments.length>1){return selectEventType(type);}
	return selectEventType;
}
	
export const addEventListener = ('addEventListener' in document) ? nativeAddEventListener:attachEvent;
