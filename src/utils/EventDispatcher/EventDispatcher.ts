import {SimpleEventDispatcher} from '../SimpleEventDispatcher'; 

export class EventDispatcher implements EventTarget{
	
	protected eventsListeners:{[key:string]:SimpleEventDispatcher} = {}
	
	public addEventListener(type:string,listener:EventListenerOrEventListenerObject):void{
		if(!this.eventsListeners[type]){
			this.eventsListeners[type] = SimpleEventDispatcher();	
		}
		this.eventsListeners[type].addEventListener(listener);
	}
	
	public removeEventListener(type:string,listener:EventListenerOrEventListenerObject):void{
		if(!this.eventsListeners[type] || !this.eventsListeners[type].size()){return;}
		this.eventsListeners[type].removeEventListener(listener);
	}
	
	public dispatchEvent(evt):boolean{
		const {type} = evt;
		if(!this.eventsListeners[type] || !this.eventsListeners[type].size()){return false;}
		return this.eventsListeners[type].dispatchEvent(evt);
	}
}