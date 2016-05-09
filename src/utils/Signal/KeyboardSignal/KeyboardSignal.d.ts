/// <reference path="../CombinedSignal/CombinedSignal.d.ts" />
/// <reference path="../InputSignal/InputSignal.d.ts" />

interface KeyboardSignal extends InputSignal{}

interface KeyboardSignalKeysMap{
	[keyName:string]:number[];
}

interface KeyboardSignalHash{
	[type:string]:KeyboardSignal;
}

interface KeyboardSignalKeycodesHash{
	[keyCode:number]:string
}

interface KeyboardHandlerSignal extends CombinedSignal<Event>{}