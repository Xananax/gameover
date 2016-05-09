/// <reference path="../Signal/Signal.d.ts" />

interface MergedSignal extends Signal<any,any>{
	merge(signals:Signal<any,any>[]):Signal<any,any>
}