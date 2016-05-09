interface KeyCodeProvider{
	(keyName:string):number
}
interface KeyboardLayoutProvider{
	(layout?:string):KeyCodeProvider
}

interface KeyboardLayout{
	[name:string]:number
}
