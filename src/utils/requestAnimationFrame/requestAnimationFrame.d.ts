interface Window {
	mozRequestAnimationFrame(callback:FrameRequestCallback): number;
	webkitRequestAnimationFrame(callback:FrameRequestCallback):number;
	mozCancelAnimationFrame(handle:number):void;
	webkitCancelAnimationFrame(handle:number):void;
	webkitCancelRequestAnimationFrame(handle:number):void;
	attachEvent(type:string,callback:EventListener):void;
	detachEvent(type:string,callback:EventListener):void;
}