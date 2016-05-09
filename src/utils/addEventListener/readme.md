# addEventListener

`(obj:Node)=>(type:string)=>(fn:EventListener,useCapture?:boolean)=>():boolean`

Adds a Dom Events listener. Returns a function that removes the listener.

# removeEventListener

`(obj:Node)=>(type:string)=>(fn:EventListener,useCapture?:boolean)=>boolean`

Removes an event listener
