# CombinedSignal

Combines multiple signals


## CombinedSignal(dependencies:Signal[],operation:Function)=>Signal

- `dependencies` can be an array or an object.
- `operation` can operate a transform on the value

```js
const deps = {
	a:Signal('a')
,	b:Signal('b')
};
const signal = CombinedSignal(deps);

signal.add(function(vals){
	console.log(vals);
});
deps.a('A'); //logs {a:'A', b:'b'}
```