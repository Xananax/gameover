# EventDispatcher

```js
EventDispatcher{
	addEventListener(type:string,listener:EventListener,useCapture?:boolean): void;
	dispatchEvent(evt:Event):boolean;
	removeEventListener(type:string,listener:EventListener,useCapture?:boolean):void;
}
```
	