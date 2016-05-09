/// <reference path="./debounce.d.ts" />

/**
 * Debounces a function; the function will run only once, even if it is called repeteadly
 * debounce :: Function Trigger, Optional Boolean Autostart => Int Delay => Any Arg
 *
 * Trigger: Any function
 * Autostart: if true, the event will fire once when it's called the first time (as well as the last time)
 * Delay: An integer in milliseconds, defaults to 250
 * Arg: An argument that get passed to the function once it runs
 *
 * Example
 * ```
 * addEventListener(document)('resize')
 *	(debounce((evt)=>console.log(evt))(250));
 * ```
 */

export const debounce = <iDebouncer>function(callback:Function,delay?:number,first?:boolean):Function{
	let timeout;
	let hasStarted = false;
	function setDebouncedOptions(delay=250,first:boolean=false):Function{
		if(delay==null || delay <= 0){
			debounce.defaultDelay = 250;
		}
		function debounced(args?:any,restart?:boolean):void{
			function trigger(){
				callback(args);
				hasStarted = false;
			}
			clearTimeout(timeout);
			timeout = setTimeout(trigger,delay);
			if(restart){
				hasStarted = false;
			}
			if(!hasStarted && first){
				hasStarted = true;
				callback(args);
			}
		};
		return debounced;
	}
	if(arguments.length>2){return setDebouncedOptions(delay,first);}
	if(arguments.length>1){return setDebouncedOptions(delay);}
	return setDebouncedOptions;
}

debounce.defaultDelay = 250;
