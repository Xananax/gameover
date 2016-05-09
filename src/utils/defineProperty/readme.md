# defineProperty

`defineProperty:(flags:number=DEFAULT_FLAGS)=>(obj:Object)=>(propertyName:string,value?:any,getterSetter?:object):any`

- `flags` is one of:
	- `WRITABLE`
	- `CONFIGURABLE`
	- `VISIBLE`
	- `OVERRIDE`
	- `ENUMERABLE` = `VISIBLE`
	- `EDITABLE` = `WRITABLE | CONFIGURABLE`
	- `REGULAR` = `OVERRIDE|EDITABLE|VISIBLE`
	- `DEFAULT_FLAGS` (default) = `OVERRIDE|EDITABLE`
- `object` is the object you want to define a property on
- `propertyName` is the name of the property.
- optional `value` is the value of the property
- optional `getterSetter` is an object with one of `get` or `set` properties. Signatures of `get` and `set` are slightly different from the regular ones
	- `get` receives a value (the current value) and should return a value to the user
	- `set` receives a value (the given value) and should return a value that will be set
- returns the given object, augmented with the given properties 