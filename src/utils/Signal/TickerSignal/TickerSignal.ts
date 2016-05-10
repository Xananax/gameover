/// <reference path="./TickerSignal.d.ts" />

import {Ticker} from '../../Ticker';
import {Signal} from '../Signal';

const timedSignals:TickerSignalTimedSignals = {}

function getSignalForTick(update:Function,max:number,updateSignal:TickerSignalSignal):TickerSignalSignal{
	if(max <= 0){max = 1;}
	if(max == 1){return updateSignal;}
	if(!timedSignals[max]){
		let ms = 0;
		let count = 0;
		const dispatcher = Signal(0);
		function tick(delta){
			ms+=delta;
			if(ms>=max){
				ms = 0;
				count++;
				dispatcher(count);
			}
		}
		update(tick);
		timedSignals[max] = dispatcher;
	}
	return timedSignals[max];	
}

let instance:TickerSignal;

export function TickerSignal(_options?:any):TickerSignal{
	if(!instance){
		instance = createTickerSignal(_options);
	}else if(_options){
		instance.options(_options);
	}
	return instance;
}

function createTickerSignal(_options?:any):TickerSignal{
	const ticker = Ticker(_options);
	const {
		render
	,	update
	,	options
	,	start
	,	stop
	,	isPaused
	,	clear
	,	slow
	,	fps
	} = ticker;
	
	const renderSignal = Signal();
	const removeRender = render(renderSignal);
	renderSignal.onDispose.push(removeRender);
	
	function onTick(max:number):TickerSignalSignal;
	function onTick(max:number,listener:EventListener):()=>boolean;
	function onTick(max:number,listener?:EventListener):any{
		if(!listener){
			return getSignalForTick(update,max,updateSignal)
		}
		return getSignalForTick(update,max,updateSignal).add(listener);
	}
	
	const updateSignal = Signal();
	const removeUpdate = update(updateSignal);
	updateSignal.onDispose.push(removeUpdate);
	
	const tickerSignal:TickerSignal = {
		render:renderSignal
	,	update:updateSignal
	,	tick:onTick
	,	options
	,	start
	,	stop
	,	isPaused
	,	clear
	,	slow
	,	fps		
	}
	
	return tickerSignal;
	
}