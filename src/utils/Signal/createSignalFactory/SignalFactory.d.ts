/// <reference path="../Signal/Signal.d.ts" />

interface SignalFactoryMixin{
	(s:Signal<any,any>):void;
}

type SignalFactoryMixins = SignalFactoryMixin[];