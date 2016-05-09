export function isPromise(obj:any):boolean{
	return obj && (typeof obj=='object') && ('then' in obj) && (typeof obj.then == 'function')
}