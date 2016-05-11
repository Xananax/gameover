# throttle

`(callback:Function)=>(interval?:number=100):Function callback`

Sets a function to run no more than once every `interval`, no matter how many times it is called in between.
Returns the throttled function.