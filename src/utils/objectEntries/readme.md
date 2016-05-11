# objectEntries

`(object)=>Iterator`

returns a valid iterator for a given object. This allows the object to be used in `for...of` loops:

```js
for(let [k,v] of objectEntries(obj){
	// do something with k and v;
}
```