# KeyboardLayout

`keyboardLayout(string?:layout='qwerty') => keyCode(name:string) => number`

Returns numeric keycode values for given strings.  
Only one layout (`qwerty`) is implemented at the moment.

```js
const keyCode = KeyboardLayout();
keyCode('enter') //13
keyCode('left') //33
```