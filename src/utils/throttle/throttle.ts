/// <reference path="./throttle.d.ts" />

import {now} from '../now';

export const throttle = <iThrottler>function(fn:Function, interval?:number):Function{

	if(interval==null || interval<=0){
		interval=throttle.defaultInterval;
	}
	
	const context = this;
	let last,timer;

	function throttled(...args):void{

		const currentTime = now();

		function trigger(){
			last = currentTime;
			fn.apply(context,args);
		}

		if(last && currentTime < last + interval){
			clearTimeout(timer);
			timer = setTimeout(trigger,interval||throttle.defaultInterval);
		}else{
			trigger();
		}
	};

	return throttled;
}

throttle.defaultInterval = 100;