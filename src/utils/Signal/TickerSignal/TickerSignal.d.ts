/// <reference path="../../Ticker/Ticker.d.ts" />
/// <reference path="../Signal/Signal.d.ts" />

interface TickerSignalSignal extends Signal<number,number>{}

interface TickerSignalTimedSignals{
	[name:string] : TickerSignalSignal;
}

interface TickerSignal extends TickerBase{
	render:TickerSignalSignal;
	update:TickerSignalSignal;
	tick(max:number):TickerSignalSignal;
	tick(max:number,listener:EventListener):()=>boolean;
}