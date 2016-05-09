# MergedSignal

Creates a signal that reacts to any child signal.

## MergedSignal()

Returns a signal that can react to child signals;

```js
const s = MergedSignal();
const s2 = Signal();
const s3 = Signal();
s.add(function(value){
	console.log(value);
});
s.merge([s2,s3]);
s2('a'); //logs 'a'
s3('b'); //logs 'b'
```

## MergedSignalMixin(signal:Signal,merges?:Signal[])

Augments a signal to become a `MergedSignal`. Optionally merges the `merges` array

```js
const s = Signal();
MergedSignalMixin(s);
// same as above
```

## merge(signal:Signal,merges:Signal[])

merges the results of `merges` with `signal`.

```js
const s = Signal();
const s2 = Signal();
const s3 = Signal();
s.add(function(value){
	console.log(value);
});
merge(s,[s2,s3]);
s2('a'); //logs 'a'
s3('b'); //logs 'b'
```