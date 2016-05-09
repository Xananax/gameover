interface DomEventSignal extends Signal<Event,Event>{}
interface DomSignal extends Signal<HTMLElement,HTMLElement>{
	on(type:string):DomEventSignal
}
interface DomEventSignalsHash{
	[type:string]:DomEventSignal
}