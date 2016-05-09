# CounterSignal

```js
const clicks = CounterSignal();
document.addEventListener('click',clicks);
let timer;
clicks.increment().add(function(count){
	clearTimeout(timer);
	timer = setTimeout(function(){
		triggerOneClick()
		clicks.value = 0;
	},150)
	if(count>=2){
		triggerDoubleClick();
		clicks.value = 0;
	}
	
});
```
## CounterSignal(n?:number)=>CounterSignal

## counter.increment(n?:number)=>Signal

## counter.decrement(n?:number)=>Signal

## CounterSignalMixin(signal:Signal)=>CounterSignal

