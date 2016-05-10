/// <reference path="./Vector.d.ts" />

import {
	dimensionStringFromNumber
,	toDegrees
,	toRadians
,	random
} from './utils';

// comparisons:
export const isZero = (v:Vector) => v.every(val=>(val==0));
export const isEqualTo = (v:Vector,v2:Vector) => v.every((val,i)=>(val==v2[i]));

// conversions:
export const asString = (v:Vector):string => '['+v.map((val,i)=>`${dimensionStringFromNumber(i)}:${val}`).join(',')+']';
export const asObject = (v:Vector,obj:VectorObject={x:0,y:0}):VectorObject =>{
	v.forEach((val,i)=>obj[dimensionStringFromNumber(i)]=val);
	return obj;
}
export const asArray = (v:Vector):Array<number> => v;

export function toVector(n:any,y?:number,z?:number):Vector{
	if(n==null || !arguments.length){return [0,0];}
	if(Array.isArray(n)){
		return n;
	}
	if(typeof n == 'number'){
		if(z==null){
			return [+n||0,+y||0];
		}
		return [+n,+y||0,+z||0];
	}
	if('x' in n){
		if('z' in n){
			return [+n.x||0,+n.y||0,+n.z||0];
		}
		return [+n.x||0,+n.y||0];
	}
	return [0,0];
}

// relations

export const distanceSq = (v:Vector,v2:Vector):number => v.map((val,i)=>val-v2[i]).map(v=>v*v).reduce((prev,curr)=>prev+curr);
export const distance = (v:Vector,v2:Vector):number => Math.sqrt(distanceSq(v,v2));
export const dot = (v:Vector,v2:Vector):number => v.map((val,i)=>val*v2[i]).reduce((prev,curr)=>prev+curr);
export const cross = (v:Vector,v2:Vector):number => v.slice(0,2).reverse().map((val,i)=>val*v2[i]).reduce((prev,curr)=>prev-curr);
export const coefficient = (v:Vector,v2:Vector):number => (v.slice(0,2).map((val,i)=>val*v2[i]).reduce((prev,curr)=>prev+curr) / (v2.slice(0,2).map((val,i)=>val*val).reduce((prev,curr)=>prev+curr) || 1));
export const project = (v:Vector,v2:Vector,coeff:number=coefficient(v,v2)):Vector => v2.map((val)=>val*coeff);

// rotations
export const rotate = (v:Vector,radians:number):Vector => [
	(v[0] * Math.cos(radians)) - (v[1] * Math.sin(radians))
,	(v[0] * Math.sin(radians)) + (v[1] * Math.cos(radians))
];

export const rotateDeg = (v:Vector,degrees:number):Vector => rotate(v,toRadians(degrees));

export const rotateTo = (v:Vector,radians:number) => rotate(v,radians-horizontalAngle(v));

export const rotateToDeg = (v:Vector,degrees:number)=>rotateTo(v,toRadians(degrees));

export const rotateBy = (v:Vector,radians:number) => rotate(v,radians+horizontalAngle(v));

export const rotateByDeg = (v:Vector,degrees:number)=>rotateBy(v,toRadians(degrees));

export const verticalAngle = (v:Vector):number => Math.atan2(v[0],v[1]);
export const horizontalAngle = (v:Vector):number => verticalAngle(v.slice().reverse())
export const verticalAngleDegrees = (v:Vector):number => toDegrees(verticalAngle(v));
export const horizontalAngleDegrees = (v:Vector):number => toDegrees(horizontalAngle(v));

// utils
const x = (n:VectorValidArg):number[] => (typeof n == 'number') ? [<number>n] : (n && 'x' in <VectorObject>n) ? [(<VectorObject>n).x] : [n[0]];
const y = (n:VectorValidArg):number[] => (typeof n == 'number') ? [,<number>n] : (n && 'y' in <VectorObject>n) ? [,(<VectorObject>n).y] : [,n[1]];
const z = (n:VectorValidArg):number[] => (typeof n == 'number') ? [,,<number>n] : (n && 'z' in <VectorObject>n) ? [,,(<VectorObject>n).z] : [,,n[2]];


// operations
function operate(v:Vector,n:VectorValidArg,operation:VectorOperation):Vector{
	if((typeof n == 'number')){
		return v.map((val)=>operation(val,<number>n))
	}
	return v.map((val,i)=> (typeof n[i]!= 'undefined') ? operation(val,+n[i]) : val);
}

export const magnitudeSq = (v:Vector):number => v.map(val=>val*val).reduce((curr,prev)=>curr+prev);
export const magnitude = (v:Vector):number => Math.sqrt(magnitudeSq(v));
export const normalize = (v:Vector,mag:number=magnitude(v)):Vector => (mag) ? divide(v,[mag,mag]) : v.map((val,i)=>i==0?1:0);

export const limit = (v:Vector,max:number,factor:number):Vector => v.map((val,i)=>(Math.abs(val) > max) ? (val * factor) : val);
export const zero = (v:Vector) => v.map(val=>0);

export const unfloat = (v:Vector):Vector => v.map(val=>Math.round(val));
export const fix = (v:Vector,precision:number=8) => v.map(val=>val.toFixed(precision));

export const set = (v:Vector,n:VectorValidArg):Vector => operate(v,n,(v,n)=>n);
export const add = (v:Vector,n:VectorValidArg):Vector => {
	const a = operate(v,n,(v,n)=>v+n)
	return a;
};
export const subtract = (v:Vector,n:VectorValidArg):Vector => operate(v,n,(v,n)=>v-n);
export const multiply = (v:Vector,n:VectorValidArg):Vector => operate(v,n,(v,n)=>v*n);
export const divide = (v:Vector,n:VectorValidArg):Vector => operate(v,n,(v,n)=>n!==0 ? v/n : 0);
export const invert = (v:Vector):Vector => operate(v,0,(v,n)=>v*-1);
export const randomize = (v:Vector,n:VectorValidArg):Vector => operate(v,n,(v,n)=>random(Math.min(v,n),Math.max(v,n)));
export const mix = (v:Vector,amount:number=.5,n:VectorValidArg) => operate(v,n,(v,n)=>(1-amount)*v+amount*n);

export const setX = (v:Vector,n:VectorValidArg):Vector => set(v,x(n));
export const addX = (v:Vector,n:VectorValidArg):Vector => add(v,x(n));
export const subtractX = (v:Vector,n:VectorValidArg):Vector => subtract(v,x(n));
export const multiplyX = (v:Vector,n:VectorValidArg):Vector => multiply(v,x(n));
export const divideX = (v:Vector,n:VectorValidArg):Vector => divide(v,x(n));
export const invertX = (v:Vector):Vector => multiply(v,x(-1));
export const distanceX = (v:Vector,n:VectorValidArg):number => subtract(v,x(n))[0];
export const distanceXAbs = (v:Vector,n:VectorValidArg):number => Math.abs(distanceX(v,n));
export const randomizeX = (v:Vector,n:VectorValidArg):Vector => randomize(v,x(n));
export const mixX = (v:Vector,amount:number=.5,n:VectorValidArg):Vector => mix(v,amount,x(n))

export const setY = (v:Vector,n:VectorValidArg):Vector => set(v,y(n));
export const addY = (v:Vector,n:VectorValidArg):Vector => add(v,y(n));
export const subtractY = (v:Vector,n:VectorValidArg):Vector => subtract(v,y(n));
export const multiplyY = (v:Vector,n:VectorValidArg):Vector => multiply(v,y(n));
export const divideY = (v:Vector,n:VectorValidArg):Vector => divide(v,y(n));
export const invertY = (v:Vector):Vector => multiply(v,y(-1));
export const distanceY = (v:Vector,n:VectorValidArg):number => subtract(v,y(n))[1];
export const distanceYAbs = (v:Vector,n:VectorValidArg):number => Math.abs(distanceY(v,n));
export const randomizeY = (v:Vector,n:VectorValidArg):Vector => randomize(v,y(n));
export const mixY = (v:Vector,amount:number=.5,n:VectorValidArg):Vector => mix(v,amount,y(n))

export const setZ = (v:Vector,n:VectorValidArg):Vector => set(v,z(n));
export const addZ = (v:Vector,n:VectorValidArg):Vector => add(v,z(n));
export const subtractZ = (v:Vector,n:VectorValidArg):Vector => subtract(v,z(n));
export const multiplyZ = (v:Vector,n:VectorValidArg):Vector => multiply(v,z(n));
export const divideZ = (v:Vector,n:VectorValidArg):Vector => divide(v,z(n));
export const invertZ = (v:Vector):Vector => multiply(v,z(-1));
export const distanceZ = (v:Vector,n:VectorValidArg):number => subtract(v,z(n))[2];
export const distanceZAbs = (v:Vector,n:VectorValidArg):number => Math.abs(distanceZ(v,n));
export const randomizeZ = (v:Vector,n:VectorValidArg):Vector => randomize(v,z(n));
export const mixZ = (v:Vector,amount:number=.5,n:VectorValidArg):Vector => mix(v,amount,z(n))

const toV = (n:any)=>{
	if(typeof n=='number' || Array.isArray(n)){return n;}
	if(!n){throw new Error('argument needed');}
	if(n._v){
		return n._v; 
	}
	if('x' in n && 'y' in n){
		if('z' in n){
			return [n.x,n.y,n.z];
		}
		return [n.x,n.y];
	}
}

const VectorClassPrototype = Object.assign(
	Object.create(null,
		{
		x:{get(){return this._v[0]},set(n){this._v[0]=n;}}
	,	y:{get(){return this._v[1]},set(n){this._v[1]=n;}}
	,	z:{get(){return this._v[2]},set(n){this._v[2]=n;}}
	})
,	{
		isZero():boolean{return isZero(this._v);}
	,	isEqualTo(v2:Vector):boolean{return isEqualTo(this._v,toV(v2));}
	,	toString():string{return asString(this._v);}
	,	toObject():VectorObject{return asObject(this._v)}
	,	toArray():Array<number>{return this._v.slice()}
	,	distanceSq(v2:Vector):number{return distanceSq(this._v,v2)}
	,	distance(v2:Vector):number{return distance(this._v,toV(v2))}
	,	distanceX(n:VectorValidArg):number{return distanceX(this._v,toV(n))}
	,	distanceY(n:VectorValidArg):number{return distanceY(this._v,toV(n))}
	,	distanceZ(n:VectorValidArg):number{return distanceZ(this._v,toV(n))}
	,	dot(v2:Vector):number{return dot(this._v,toV(v2))}
	,	cross(v2:Vector):number{return cross(this._v,v2)}
	,	coefficient(v2:Vector):number{return coefficient(this._v,toV(v2))}
	,	project(v2:Vector):VectorClass{return this._assign(project(this._v,toV(v2)))}
	,	rotate(radians:number):VectorClass{return this._assign(rotate(this._v,radians))}
	,	rotateDeg(degrees:number):VectorClass{return this._assign(rotateDeg(this._v,degrees))}
	,	rotateTo(radians:number):VectorClass{return this._assign(rotateTo(this._v,radians))}
	,	rotateToDeg(degrees:number):VectorClass{return this._assign(rotateToDeg(this._v,degrees))}
	,	rotateBy(radians:number):VectorClass{return this._assign(rotateBy(this._v,radians))}
	,	rotateByDeg(degrees:number):VectorClass{return this._assign(rotateByDeg(this._v,degrees))}
	,	horizontalAngle():number{return horizontalAngle(this._v)}
	,	horizontalAngleDeg():number{return horizontalAngleDegrees(this._v)}
	,	verticalAngle():number{return verticalAngle(this._v)}
	,	verticalAngleDegrees():number{return verticalAngleDegrees(this._v)}
	,	magnitudeSq():number{return magnitudeSq(this._v)}
	,	magnitude():number{return magnitude(this._v)}
	,	normalize():VectorClass{return this._assign(normalize(this._v))}
	,	limit(max:number,factor:number):VectorClass{return this._assign(limit(this._v,max,factor))}
	,	zero():VectorClass{return this._assign(zero(this._v))}
	,	unfloat():VectorClass{return this._assign(unfloat(this._v))}
	,	fix():VectorClass{return this._assign(fix(this._v))}
	,	add(n:VectorValidArg):VectorClass{return this._assign(add(this._v,toV(n)))}
	,	subtract(n:VectorValidArg):VectorClass{return this._assign(subtract(this._v,toV(n)))}
	,	multiply(n:VectorValidArg):VectorClass{return this._assign(multiply(this._v,toV(n)))}
	,	divide(n:VectorValidArg):VectorClass{return this._assign(divide(this._v,toV(n)))}
	,	invert():VectorClass{return this._assign(invert(this._v))}
	,	randomize(n:VectorValidArg):VectorClass{return this._assign(randomize(this._v,toV(n)))}
	,	mix(n:VectorValidArg,amount:number=.5):VectorClass{return this._assign(mix(this._v,amount,toV(n)))}
	,	addX(n:VectorValidArg):VectorClass{return this._assign(addX(this._v,n))}
	,	subtractX(n:VectorValidArg):VectorClass{return this._assign(subtractX(this._v,toV(n)))}
	,	multiplyX(n:VectorValidArg):VectorClass{return this._assign(multiplyX(this._v,toV(n)))}
	,	divideX(n:VectorValidArg):VectorClass{return this._assign(divideX(this._v,toV(n)))}
	,	invertX(n:VectorValidArg):VectorClass{return this._assign(invertX(this._v))}
	,	randomizeX(n:VectorValidArg):VectorClass{return this._assign(randomizeX(this._v,toV(n)))}
	,	mixX(n:VectorValidArg,amount:number=.5):VectorClass{return this._assign(mixX(this._v,amount,toV(n)))}
	,	addY(n:VectorValidArg):VectorClass{return this._assign(addY(this._v,toV(n)))}
	,	subtractY(n:VectorValidArg):VectorClass{return this._assign(subtractY(this._v,toV(n)))}
	,	multiplyY(n:VectorValidArg):VectorClass{return this._assign(multiplyY(this._v,toV(n)))}
	,	divideY(n:VectorValidArg):VectorClass{return this._assign(divideY(this._v,toV(n)))}
	,	invertY(n:VectorValidArg):VectorClass{return this._assign(invertY(this._v))}
	,	randomizeY(n:VectorValidArg):VectorClass{return this._assign(randomizeY(this._v,toV(n)))}
	,	mixY(n:VectorValidArg,amount:number=.5):VectorClass{return this._assign(mixY(this._v,amount,toV(n)))}
	,	addZ(n:VectorValidArg):VectorClass{return this._assign(addZ(this._v,toV(n)))}
	,	subtractZ(n:VectorValidArg):VectorClass{return this._assign(subtractZ(this._v,toV(n)))}
	,	multiplyZ(n:VectorValidArg):VectorClass{return this._assign(multiplyZ(this._v,toV(n)))}
	,	divideZ(n:VectorValidArg):VectorClass{return this._assign(divideZ(this._v,toV(n)))}
	,	invertZ(n:VectorValidArg):VectorClass{return this._assign(invertZ(this._v))}
	,	randomizeZ(n:VectorValidArg):VectorClass{return this._assign(randomizeZ(this._v,toV(n)))}
	,	mixZ(n:VectorValidArg,amount:number=.5):VectorClass{return this._assign(mixZ(this._v,amount,toV(n)))}
	,	clone(){return this._create(this._v.slice());}
	}
);

export function Vector(n?:any,y?:number,z?:number):VectorClass{
	const _v = toVector(n,y,z);
	const _assign = Vector;
	const _create = Vector;
	const vector = Object.assign(Object.create(VectorClassPrototype),{_v,_assign,_create});
	return vector;
}


export function ChainableVector(n?:any,y?:number,z?:number):VectorClass{
	const _v = toVector(n,y,z);
	const _assign = function(v){
		this._v = v;
		return this;
	}
	const _create = ChainableVector;
	const vector = Object.assign(Object.create(VectorClassPrototype),{_v,_assign,_create});
	return vector;
}
