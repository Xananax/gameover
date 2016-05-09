/// <reference path="./requestAnimationFrame.d.ts" />

/**
 * RequestAnimationFrame Polyfill
 *
 * RequestAnimationFrame :: (Int) -> ()
 *
 * Function Callback : called on each frame; receives a timestamp
 * Int TimeStamp:`DOMHighResTimeStamp` that represents the time the callback was called
 * Function: call it to cancel the request
 *
 * NOTE: If requestAnimationFrame is shimmed, the time reported will use Date.now(),
 * which is an Int, whereas DOMHighResTimeStamp is a Float
 * (milliseconds.microseconds. The spec allows to not report microseconds, so it is
 * browser-dependant).
 *
 * Usage:
 * ```
 * import requestAnimationFrame from 'requestAnimationFrame'
 * cancelAnimationFrame = requestAnimationFrame(callback);
 * cancelAnimationFrame();
 * ```
 *
 * Inspirations and stolen code from:
 * https://gist.github.com/paulirish/1579671
 * https://github.com/ngryman/raf.js
 * https://github.com/julienetie/request-frame
 *
 */

import {now} from '../now';

// test for native
const _request:Function = (window && (
	('requestAnimationFrame' in window && window.requestAnimationFrame) ||
	('mozRequestAnimationFrame' in window && window.mozRequestAnimationFrame) ||
	('webkitRequestAnimationFrame' in window && window.webkitRequestAnimationFrame)
));

// test for native
const _cancel:Function = (window && (
	('cancelAnimationFrame' in window && window.cancelAnimationFrame) ||
	('mozCancelAnimationFrame' in window && window.mozCancelAnimationFrame) ||
	('webkitCancelAnimationFrame' in window && window.webkitCancelAnimationFrame) ||
	('webkitCancelRequestAnimationFrame' in window && window.webkitCancelRequestAnimationFrame)
));

// Firefox version something has a request but no cancel
const mismatch:boolean = !(_request && _cancel)
// if no mismatch and no bug, we're good to go.
const valid:boolean = (!mismatch && !hasIOS6RequestAnimationFrameBug());

let lastTime = 0;

export const requestAnimationFrame = (valid ?
	function nativeRequestFrame(callback:Function):Function{
		const id = _request(callback);
		function removeAnimationFrame():void{
			return _cancel(id);
		}
		return removeAnimationFrame;
	} :
	function poorsManRequestAnimationFrame(callback:Function):Function{
		const currTime = now();
		const timeToCall = Math.max(0, 16 - (currTime - lastTime));
		function trigger(){
			callback(currTime + timeToCall);
		}
		const id = setTimeout(trigger,timeToCall);
		lastTime = currTime + timeToCall;
		function poorMansCancelAnimationFrame():void{
			return clearTimeout(id);
		}
		return poorMansCancelAnimationFrame;
	}
);

/**
 * hasIOS6RequestAnimationFrameBug.
 * @See {@Link https://gist.github.com/julienetie/86ac394ec41f1271ff0a}
 * - for Commentary.
 * @Copyright 2015 - Julien Etienne.
 * @License: MIT.
 */
export function hasIOS6RequestAnimationFrameBug():boolean{

	// exit early on node
	if(!window){return false;}

	// the bug is only on mobile
	const hasMobileDeviceWidth = (screen.width <= 768);
	if(!hasMobileDeviceWidth){return false;}

	// the bug is on a webkit that uses the perfixed version
	const requiresWebkitPrefix = (window.webkitRequestAnimationFrame && !window.requestAnimationFrame);
	if(!requiresWebkitPrefix){return false;}

	// the bug uses a webkit version that doesn't have the performance API
	const hasNoNavigationTiming = !!window.performance
	if(!hasNoNavigationTiming){return false;}

	return true;
}
