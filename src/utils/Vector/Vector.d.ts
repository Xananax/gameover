interface Vector extends Array<number>{}
interface Vector2D extends Vector{}
interface Vector3D extends Vector2D{}

type VectorValidArg = number[]|number|VectorClass|VectorObject;

interface VectorClass{
	x:number;
	y:number;
	z:number;
	_v:Vector;
	_assign(v:Vector):VectorClass
	isZero():boolean;
	isEqualTo(v2:Vector):boolean;
	toString():string;
	toObject():VectorObject;
	toArray():Array<number>;
	distanceSq(v2:Vector):number;
	distance(v2:Vector):number;
	dot(v2:Vector):number;
	cross(v2:Vector):number;
	coefficient(v2:Vector):number;
	project(v2:Vector):VectorClass;
	rotate(radians:number):VectorClass;
	rotateDeg(degrees:number):VectorClass;
	rotateTo(radians:number):VectorClass;
	rotateToDeg(degrees:number):VectorClass;
	rotateBy(radians:number):VectorClass;
	rotateByDeg(degrees:number):VectorClass;
	horizontalAngle():number;
	horizontalAngleDeg():number;
	verticalAngle():number;
	verticalAngleDegrees():number;
	magnitudeSq():number;
	magnitude():number;
	normalize():VectorClass;
	limit(max:number,factor:number):VectorClass;
	zero():VectorClass;
	unfloat():VectorClass;
	fix():VectorClass;
	add(n:VectorValidArg):VectorClass;
	substract(n:VectorValidArg):VectorClass;
	multiply(n:VectorValidArg):VectorClass;
	divide(n:VectorValidArg):VectorClass;
	invert():VectorClass;
	randomize(n:VectorValidArg):VectorClass;
	mix(n:VectorValidArg,amount?:number):VectorClass;
	addX(n:VectorValidArg):VectorClass;
	substractX(n:VectorValidArg):VectorClass;
	multiplyX(n:VectorValidArg):VectorClass;
	divideX(n:VectorValidArg):VectorClass;
	invertX(n:VectorValidArg):VectorClass;
	randomizeX(n:VectorValidArg):VectorClass;
	mixX(n:VectorValidArg,amount?:number):VectorClass;
	addY(n:VectorValidArg):VectorClass;
	substractY(n:VectorValidArg):VectorClass;
	multiplyY(n:VectorValidArg):VectorClass;
	divideY(n:VectorValidArg):VectorClass;
	invertY(n:VectorValidArg):VectorClass;
	randomizeY(n:VectorValidArg):VectorClass;
	mixY(n:VectorValidArg,amount?:number):VectorClass;
	addZ(n:VectorValidArg):VectorClass;
	substractZ(n:VectorValidArg):VectorClass;
	multiplyZ(n:VectorValidArg):VectorClass;
	divideZ(n:VectorValidArg):VectorClass;
	invertZ(n:VectorValidArg):VectorClass;
	randomizeZ(n:VectorValidArg):VectorClass;
	mixZ(n:VectorValidArg,amount?:number):VectorClass;
	clone():VectorClass
}

interface VectorObject{
	x:number;
	y:number;
	z?:number;
}

interface VectorOperation{
	(v:number,n:number):number
}

interface VectorSetNumber<T>{
	(n:number):T;
}