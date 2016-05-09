export function assign(...args):Object{
	const target = Object.create(null);
	if(!args.length){
		return target;
	}
	return Object.assign(target,...args);
}