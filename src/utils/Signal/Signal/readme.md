# Signal

Creates reactive functions, a bit like [Elm's Signals](http://package.elm-lang.org/packages/elm-lang/core/2.1.0/Signal).

## Signal(value?:any,operation?:function)

Creates a signal. Optionally assigns a mapping value.

```js
const s = Signal(1);
const onSignal(function(value){
	console.log(value);
});
s.add(onSignal);
s(2); //logs `2`
s(1); //logs `1`
```

## signal.map((value:any,previousValue:any):any)=>Signal

Maps the incoming input to an outcoming output.
The passed function has the signature `(value:any,previousValue:any)`, which allows "reduce" type operations.

```js
const s = Signal();
s.map(function(value){
	return value+1;
})
s.add(function(value){
	console.log(value);
})
s(2); //logs `3`
s(1); //logs `2`
```

```js
const s = Signal(0);
s.reduce(function(value,previous){
	return previous+value
})
s.add(function(value){
	console.log(value);
})
s(2); //logs `2`
s(1); //logs `3`
s(1); //logs `4`
```

Returning the `BREAK` symbol stops all further operations.

```js
import {Signal,BREAK} from 'Signal';

const s = Signal();
s.map(function(value){
	if(value>3){return BREAK;}
	return value+1;
})
s.add(function(value){
	console.log(value);
})
s(2); //logs `3`
s(1); //logs `2`
s(3); //logs nothing
```

## signal.map((value:any,previousValue:any):any)=>Signal

Reduce is just an alias of `map` to make intent clearer.

## signal.add((value:any):void)

Adds a listener to the signal. Returns a function that removes the listener.

```js
const s = Signal();
const remove = s.add(function(value){
	console.log(value);
});
s(2); //logs `2`
remove();
s(1); //logs nothing, the listener is removed
```

## signal.filter((value:any):boolean)=>Signal

Prevents further operation if the filter function returns false.
It's a proxy to a `map` function that returns `BREAK` if it encounters a falsy value.

## signal.noDuplicates = boolean

Prevents the signal from doing anything if a value passed is the same as the previous value.
