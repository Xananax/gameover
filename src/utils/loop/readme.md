# loop

`(source:Object|Array|string)=>(operator:Function)=>(target?:Object|Array|string):any`

Loop over an object with a functor.

To operate changes in-place, use the same object as a target.  
The `operator` has the following signature:

`(current,key,source,previous,index)`

- `current` is the current value
- `key` is the key, or index for arrays and strings
- `source` is the passed object
- `previous` is the previous value
- `index` is the property count, which is the same as `key` for strings and arrays.

You must return a value. You may return `loop.BREAK` to short-circuit processing, or `loop.SKIP` to skip a value