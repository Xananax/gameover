# getRandomValueFromArray

`(arr:Array)=>(rand?:RandomProvider)=>any`

Returns a random value from a given array. The length of the array is cached, so if you use the curried version (e.g, `getRandom(arr)()`) and the Array changes, the function may become invalid.

You can provide your own `random` function; defaults to `Math.random()`.