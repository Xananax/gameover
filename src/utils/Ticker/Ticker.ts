/// <reference path="./Ticker.d.ts" />

import {requestAnimationFrame} from '../requestAnimationFrame';
import {now} from '../now';
import {SimpleEventDispatcher} from '../SimpleEventDispatcher'; 

const defaults:TickerOptions = {
	fps:60
,	slow:1
}

let instance:Ticker = null

export function Ticker(options?:TickerOptions):Ticker{
	if(!instance){
		instance = createTicker(options);
	}else if(options){
		instance.options(options);
	}
	return instance;
}

function createTicker(_options?:TickerOptions):Ticker{
	
	const opts = Object.assign({},defaults,_options);
	
	let currentTime;
	let dt = 0;
	let last = now();
	let paused = true; 
	
	let step = 1;
	let slowStep = 1;
	
	const render = SimpleEventDispatcher();
	const update = SimpleEventDispatcher();
	const timedDispatchers:TickerTimedDispatchers = {};
	
	calculateSlow();
	
	function calculateSlow(){
		if(opts.slow <= 0){opts.slow = 1;}
		if(opts.fps <= 0){opts.fps = 60;}
		step = 1/opts.fps;
		slowStep = opts.slow * step;	
	}
	
	function options(_options:TickerOptions):void{
		Object.assign(opts,_options);
		calculateSlow();
	}
	
	function fps(_fps?:number):number{
		if(!arguments.length){
			return opts.fps;
		}
		opts.fps = _fps;
		calculateSlow();
		return opts.fps;
	}
	
	function slow(_slow?:number):number{
		if(!arguments.length){
			return opts.slow;
		}
		opts.slow = _slow;
		calculateSlow();
		return opts.slow;
	}
	
	function onTick(max:number):SimpleEventDispatcher;
	function onTick(max:number,listener:EventListener):()=>boolean
	function onTick(max:number,listener?:EventListener):any{
		if(!timedDispatchers[max]){
			let ms = 0;
			let count = 0;
			const dispatcher = SimpleEventDispatcher();
			function tick(delta){
				ms+=delta;
				if(ms>=max){
					ms = 0;
					count++;
					dispatcher.dispatchEvent(count);
				}
			}
			update.addEventListener(tick);
			timedDispatchers[max] = dispatcher;
		}
		if(!listener){
			return <SimpleEventDispatcher>timedDispatchers[max];	
		}
		return timedDispatchers[max].addEventListener(listener);
	}
	
	function frame():void{
		if(paused){return;}
		requestAnimationFrame(frame);
		currentTime = now();
		dt = dt + Math.min(1, (currentTime - last) / 1000);
		while(dt > slowStep){
			dt = dt - slowStep;
			update.dispatchEvent(step);
		}
		render.dispatchEvent(dt/opts.slow);
		last = currentTime;
	}
	
	function start(){
		if(!paused){return;}
		paused = false;
		requestAnimationFrame(frame);
		return stop;	
	}
	
	function stop(){
		if(paused){return;}
		paused = true;
		return start;
	}
	
	function clear(){
		render.dispose();
		update.dispose();
		for(let n in timedDispatchers){
			timedDispatchers[n].dispose();
			delete timedDispatchers[n];
		}
	}
	
	function isPaused():boolean{
		return paused;
	}
	
	const ticker:Ticker = {
		render:render.addEventListener
	,	update:update.addEventListener
	,	tick:onTick
	,	options
	,	start
	,	stop
	,	isPaused
	,	clear
	,	slow
	,	fps
	}
	
	return ticker;
}