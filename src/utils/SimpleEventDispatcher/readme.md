# SimpleEventDispatcher

`const dispatcher = SimpleEventDispatcher(target?:any):SimpleEventDispatcher`

creates a dispatcher for a single event type.
If `target` is passed, it will be overloaded with the following functions;
else, a new object with the functions will be created.

The functions are bound, so they can be passed around. Calling `dispatcher.addEventListener(fn)` is equivalent to `const a = dispatcher.addEventListener; a(fn)`.

## dispatcher.addEventListener

`(listener:EventListener):()=>boolean`

Adds an event listener and returns a function to remove the listener.

## dispatcher.removeEventListener

`removeEventListener(listener:EventListener):boolean`

Removes an event listener. Returns false if the event listener was not found.


## dispatcher.dispatchEvent

`dispatchEvent(arg:any):boolean`

dispatches the event to all listeners. Returns false if there were no listeners.


## dispatcher.dispose

`()=>boolean`

removes all listeners
