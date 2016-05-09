# pointerEvents

Unified interface for mouse, touch, and pointer events.


# onMouseUp, onMouseDown, onMouseMove

`(obj:Node)=>(fn:EventListener,useCapture?:boolean)=>():boolean`

Attaches the event handler and returns a function to stop listening.


# onClick, onDoubleClick

`(obj:Node)=>(fn:EventListener,options?:Object)=>():boolean`

Attaches the event handler and returns a function to stop listening.

`options` may have the following properties:
- useCapture:boolean = passed to the event listener
- distance:number = distance in pixels. If the mouse travels further than this distance the click or double click is cancelled
- delay:number = time in milliseconds. If the time between two clicks exceeds this value, the double click is cancelled. Defaults to 150 for `doubleClick`, and 0 for `click`, therefore, if you set both, be sure to specify a delay for `click` (unless you want both events to fire).
- max:number = Number of clicks. Defaults to 2 for doubleClick (not used by `click`).