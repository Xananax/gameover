interface iDebouncer {
	(callback:Function,delay?:number,first?:boolean):Function;
	defaultDelay:number;
}