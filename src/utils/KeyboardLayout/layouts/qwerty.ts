/// <reference path="../KeyboardLayout.d.ts" />


export const qwerty:KeyboardLayout = {
	'backspace': 8
,	'tab': 9
,	'enter': 13
,	'return': 13
,	'shift': 16
,	'⇧': 16
,	'ctrl': 17
,	'⌃': 17
,	'ctl': 17
,	'control': 17
,	'alt': 18
,	'⌥': 18
,	'option': 18
,	'pause/break': 19
,	'pause': 19
,	'break': 19
,	'caps lock': 20
,	'caps': 20
,	'esc': 27
,	'escape': 27
,	'space': 32
,	'spc': 32
,	'page up': 33
,	'pgup': 33
,	'pgdn': 34
,	'page down': 34
,	'end': 35
,	'home': 36
,	'left': 37
,	'up': 38
,	'right': 39
,	'down': 40
,	'insert': 45
,	'ins': 45
,	'delete': 46
,	'del': 46
,	'command': 91
,	'windows': 91
,	'⌘': 91
,	'cmd': 91
,	'right click': 93
,	'numpad *': 106
,	'numpad +': 107
,	'numpad -': 109
,	'numpad .': 110
,	'numpad /': 111
,	'num lock': 144
,	'scroll lock': 145
,	'my computer': 182
,	'my calculator': 183
,	';': 186
,	'=': 187
,	'': 188
,	'-': 189
,	'.': 190
,	'/': 191
,	'`': 192
,	'[': 219
,	'\\': 220
,	']': 221
,	"'": 222
}

// letters
for(let i=97; i < 123; i++){
	qwerty[String.fromCharCode(i)] = i - 32;
}
// numbers
for(let i=48; i < 58; i++){
	qwerty[i - 48] = i;
}
// function keys
for(let i = 1; i < 13; i++){
	qwerty['f'+i] = i + 111;
}
// numpad keys
for(let i = 0; i < 10; i++){
	qwerty['numpad '+i] = i + 96;
}