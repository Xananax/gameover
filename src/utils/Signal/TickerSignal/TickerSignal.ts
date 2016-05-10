import {Ticker} from '../../Ticker';
import {Signal} from '../Signal';

export function TickerSignal(_options){
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
	
	const updateSignal = Signal();
	const removeUpdate = update(updateSignal);
	updateSignal.onDispose.push(removeUpdate);
	
	const tickerSignal = {
		render:renderSignal
	,	update:updateSignal
	,	options
	,	start
	,	stop
	,	isPaused
	,	clear
	,	slow
	,	fps		
	}
	
}