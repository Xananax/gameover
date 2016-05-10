interface TickerOptions{
	fps:number
,	slow:number
}

interface TickerStart{
	():TickerStop
}

interface TickerTimedDispatchers{
	[name:string]:SimpleEventDispatcher
}

interface TickerStop{
	():TickerStart
}

interface Ticker{
	render(listener:EventListener):()=>boolean;
	update(listener:EventListener):()=>boolean;
	tick(ms:number):SimpleEventDispatcher;
	tick(ms:number,listener:EventListener):()=>boolean;
	options(opts:TickerOptions):void;
	start():TickerStart;
	stop():TickerStop;
	isPaused():boolean;
	clear():void
	slow(n?:number):number
	fps(n?:number):number
}