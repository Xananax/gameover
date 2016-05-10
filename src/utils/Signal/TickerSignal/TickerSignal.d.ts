/// <reference path="../../Ticker/Ticker.d.ts" />
/// <reference path="../Signal/Signal.d.ts" />


interface TickerSignal{
	render:Signal<number,number>;
	update:Signal<number,number>;
	options(opts:TickerOptions):void;
	start():TickerStart;
	stop():TickerStop;
	isPaused():boolean;
	clear():void
	slow(n?:number):number
	fps(n?:number):number
}