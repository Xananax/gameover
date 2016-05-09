interface InputSignalValue{
	name:string
,	start:number
,	stop:number
,	on:boolean
}

interface InputSignal extends Signal<any,InputSignalValue>{
	(value:boolean):void
	value:InputSignalValue
}