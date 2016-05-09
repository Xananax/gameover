interface iThrottler {
	(fn:Function, interval?:number,first?:boolean):Function;
	defaultInterval:number;
}