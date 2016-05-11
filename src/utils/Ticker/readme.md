# Ticker Constructor

`Ticker(options) => ticker`

`options` can be
 - `fps`: frames per second; defaults to `60`
 - `slow`: slow factor. to get, say, 30 frames per second, set it to 0.5. Defaults to 1;
 
 `Ticker` is a singleton, calling `Ticker()` anywhere will always return the same instance.
 
 ## Ticker
 
- `options(opts)`: sets new options. Options are as described above.
- `start()`: starts the ticker. Returns a function to stop the ticker.
- `stop()`: stops the ticker. Returns a function to start the ticker.
- `isPaused():boolean`: `true` if `stop()` was called.
- `clear()`: stops the ticker and removes all events listeners.
- `slow(n?:number)`: sets the `slow` value, or returns the `slow` value if called without arguments.
- `fps(n?:number)`: sets the `fps` value, or returns the `fps` value if called without arguments.
- `render(listener)`: triggers the `listener` function on render cycles. The `listener` function receives a `delta time` value.
- `update(listener)`: triggers the `listener` function on update cycles. The `listener` function receives a `step` value (milliseconds for each step, defaults to 1/60).
- `tick(ms:number,listener)`: triggers the `listener` value each `ms` milliseconds. The `listener` function receives the amount of times it was called.  