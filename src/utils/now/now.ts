/// <reference path="./now.d.ts" />

function wrapNativeNow(now):Function{
	return function nativeNow():number{
		return now.call(window.performance);
	}
}
function emulatedNow():number{return (new Date().getTime());}

export const now:Function = (window && window.performance) ?
	wrapNativeNow(performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow) :
	(Date.now)? Date.now : emulatedNow
;