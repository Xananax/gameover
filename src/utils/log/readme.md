# warn

`(message:string|Error,...replacements?)`

If environment is not `production`, prints the warning to console.
`replacements` replaces any `%s` in the passed message.

# log

`(message:string|Error,...replacements?)`

If environment is not `production`, logs the message to console.
`replacements` replaces any `%s` in the passed message.

# error

`(message:string|Error,...replacements?)`

If environment is not `production`, prints the error to console and throws.
`replacements` replaces any `%s` in the passed message.