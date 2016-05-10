import {
	Vector
,	ChainableVector
,	toVector
} from './Vector';
import {
	expect
} from 'chai';

const EPSILON = 0.0001;

describe('static methods', function () {

	describe('ChainableVector', function () {
		var x, y, vec1, vec2, vec3 , vec4, vec5, vec6;

		before(function () {
			x = 100;
			y = 200;
			vec1 = Vector(x, y);
			vec2 = Vector([x,y]);
			vec3 = ChainableVector(x,y)
			vec4 = ChainableVector([x,y])
			vec5 = ChainableVector({x,y})
			vec6 = toVector({x,y});
		});

		it('should be an instance of Victor', function () {
			expect(vec1._v).to.be.an('array');
			expect(vec2._v).to.be.an('array');
			expect(vec3._v).to.be.an('array');
			expect(vec4._v).to.be.an('array');
			expect(vec5._v).to.be.an('array');
			expect(vec6).to.be.an('array');
		});

		it('should have axis from arguments', function () {
			expect(vec1).to.have.property('x', x);
			expect(vec1).to.have.property('y', y);

			expect(vec2).to.have.property('x', x);
			expect(vec2).to.have.property('y', y);
		});
	});

});

describe('chainable instance methods', function () {

	describe('#addX()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(20, 40);
			vec2 = ChainableVector(30, 20);
			ret = vec1.addX(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should add only the X axis of a vector', function () {
			expect(vec1).to.have.property('x', 50);
			expect(vec1).to.have.property('y', 40);
		});
	});

	describe('#addY()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(20, 40);
			vec2 = ChainableVector(30, 20);
			ret = vec1.addY(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should add only the Y axis of a vector', function () {
			expect(vec1).to.have.property('x', 20);
			expect(vec1).to.have.property('y', 60);
		});
	});

	describe('#add()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(20, 40);
			vec2 = ChainableVector(30, 20);
			ret = vec1.add(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should add a vector', function () {
			expect(vec1).to.have.property('x', 50);
			expect(vec1).to.have.property('y', 60);
		});
	});

	describe('#subtractX()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(30, 20);
			vec2 = ChainableVector(20, 40);
			ret = vec1.subtractX(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should subtract only the X axis of a vector', function () {
			expect(vec1).to.have.property('x', 10);
			expect(vec1).to.have.property('y', 20);
		});
	});

	describe('#subtractY()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(30, 20);
			vec2 = ChainableVector(20, 40);
			ret = vec1.subtractY(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should subtract only the Y axis of a vector', function () {
			expect(vec1).to.have.property('x', 30);
			expect(vec1).to.have.property('y', -20);
		});
	});

	describe('#subtract()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(30, 20);
			vec2 = ChainableVector(20, 40);
			ret = vec1.subtract(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should subtract a vector', function () {
			expect(vec1).to.have.property('x', 10);
			expect(vec1).to.have.property('y', -20);
		});
	});

	describe('#divideX()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.divideX(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide the X axis by 2', function () {
			expect(vec).to.have.property('x', 15);
			expect(vec).to.have.property('y', 20);
		});
	});

	describe('#divideY()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.divideY(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide the Y axis by 2', function () {
			expect(vec).to.have.property('x', 30);
			expect(vec).to.have.property('y', 10);
		});
	});

	describe('#divide()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.divide(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide both vector axis by 2', function () {
			expect(vec).to.have.property('x', 15);
			expect(vec).to.have.property('y', 10);
		});
	});

	describe('#divideScalar()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.divide(scal);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide both vector axis by 2', function () {
			expect(vec).to.have.property('x', 15);
			expect(vec).to.have.property('y', 10);
		});

		it('should return a zero vector when dividing by 0', function() {
			vec = ChainableVector(30, 20);
			scal = 0;
			ret = vec.divide(scal);

			expect(vec).to.have.property('x', 0);
			expect(vec).to.have.property('y', 0);
		});
	});

	describe('#divideScalarX()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.divideX(scal);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide the X axis by 2', function () {
			expect(vec).to.have.property('x', 15);
			expect(vec).to.have.property('y', 20);
		});

		it('should return a zero X when dividing by 0', function() {
			vec = ChainableVector(30, 20);
			scal = 0;
			ret = vec.divideX(scal);

			expect(vec).to.have.property('x', 0);
		});
	});

	describe('#divideScalarY()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.divideY(scal);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should divide the Y axis by 2', function () {
			expect(vec).to.have.property('x', 30);
			expect(vec).to.have.property('y', 10);
		});

		it('should return a zero Y when dividing by 0', function() {
			vec = ChainableVector(30, 20);
			scal = 0;
			ret = vec.divideY(scal);

			expect(vec).to.have.property('y', 0);
		});
	});

	describe('#multiplyX()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.multiplyX(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should multiply the X axis by 2', function () {
			expect(vec).to.have.property('x', 60);
			expect(vec).to.have.property('y', 20);
		});
	});

	describe('#multiplyY()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.multiplyY(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should multiply the Y axis by 2', function () {
			expect(vec).to.have.property('x', 30);
			expect(vec).to.have.property('y', 40);
		});
	});

	describe('#multiply()', function () {
		var vec, vec2, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			vec2 = ChainableVector(2, 2);
			ret = vec.multiply(vec2);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should multiply both vector axis by 2', function () {
			expect(vec).to.have.property('x', 60);
			expect(vec).to.have.property('y', 40);
		});
	});

	describe('#multiplyScalar()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.multiply(scal);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should multiply both vector axis by 2', function () {
			expect(vec).to.have.property('x', 60);
			expect(vec).to.have.property('y', 40);
		});
	});

	describe('#multiplyScalarX()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.multiplyX(scal);
		});

		it('should multiply the X axis by 2', function () {
			expect(vec).to.have.property('x', 60);
			expect(vec).to.have.property('y', 20);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});
	});

	describe('#multiplyScalarY()', function () {
		var vec, scal, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			scal = 2;
			ret = vec.multiplyY(scal);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should multiply the Y axis by 2', function () {
			expect(vec).to.have.property('x', 30);
			expect(vec).to.have.property('y', 40);
		});
	});

	describe('#addScalar()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(1, 2);
			scalar = 2;
			ret = vec.add(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should add 2 to both vector axis', function () {
			expect(vec).to.have.property('x', 3);
			expect(vec).to.have.property('y', 4);
		});
	});

	describe('#addScalarX()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(1, 2);
			scalar = 2;
			ret = vec.addX(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should add 2 to the x axis', function () {
			expect(vec).to.have.property('x', 3);
			expect(vec).to.have.property('y', 2);
		});
	});

	describe('#addScalarY()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(10, 20);
			scalar = 2;
			ret = vec.addY(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should add 2 to the y axis', function () {
			expect(vec).to.have.property('x', 10);
			expect(vec).to.have.property('y', 22);
		});
	});

	describe('#subtractScalar()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(10, 20);
			scalar = 2;
			ret = vec.subtract(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should subtract 2 from both vector axis', function () {
			expect(vec).to.have.property('x', 8);
			expect(vec).to.have.property('y', 18);
		});
	});

	describe('#subtractScalarX()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(10, 20);
			scalar = 2;
			ret = vec.subtractX(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should subtract 2 from the x axis', function () {
			expect(vec).to.have.property('x', 8);
			expect(vec).to.have.property('y', 20);
		});
	});

	describe('#subtractScalarY()', function () {
		var vec, scalar, ret;

		before(function () {
			vec = ChainableVector(10, 20);
			scalar = 2;
			ret = vec.subtractY(scalar);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should add 2 to the y axis', function () {
			expect(vec).to.have.property('x', 10);
			expect(vec).to.have.property('y', 18);
		});
	});

	describe('#normalize()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(13.37, 42.42);
			ret = vec.normalize();
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

	});

	describe('#limit()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(30, 20);
			ret = vec.limit(20, 0.5);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should limit both vector axis by limit', function () {
			expect(vec).to.have.property('x', 15);
			expect(vec).to.have.property('y', 20);
		});
	});

	describe('#randomize()', function () {
		var topLeft = ChainableVector(-50, 100);
		var bottomRight = ChainableVector(300, -500);

		it('should randomize both vector axis and respect the boundaries', function () {
			var i, count = 100;

			var minX = Math.min(topLeft.x, bottomRight.x);
			var maxX = Math.max(topLeft.x, bottomRight.x);
			var minY = Math.min(topLeft.y, bottomRight.y);
			var maxY = Math.max(topLeft.y, bottomRight.y);

			for (i = 0; i < count; i++) {
				topLeft.randomize(bottomRight);

				expect(topLeft.x).to.be.within(minX, maxX);
				expect(topLeft.y).to.be.within(minY, maxY);
			}
		});
	});

	describe('#randomizeX()', function () {
		var topLeft = ChainableVector(-50, 100);
		var bottomRight = ChainableVector(300, -500);

		it('should randomize only the X axis and respect the boundaries', function () {
			var i, count = 100;

			var y = topLeft.y;
			var minX = Math.min(topLeft.x, bottomRight.x);
			var maxX = Math.max(topLeft.x, bottomRight.x);

			for (i = 0; i < count; i++) {
				topLeft.randomizeX(bottomRight);

				expect(topLeft).to.have.property('x')
					.that.is.within(minX, maxX);

				expect(topLeft).to.have.property('y', y);
			}
		});
	});

	describe('#randomizeY()', function () {
		var topLeft = ChainableVector(-50, 100);
		var bottomRight = ChainableVector(300, -500);

		it('should randomize only the X axis and respect the boundaries', function () {
			var i, count = 100;

			var x = topLeft.x;
			var minY = Math.min(topLeft.y, bottomRight.y);
			var maxY = Math.max(topLeft.y, bottomRight.y);

			for (i = 0; i < count; i++) {
				topLeft.randomizeY(bottomRight);

				expect(topLeft).to.have.property('y')
					.that.is.within(minY, maxY);

				expect(topLeft).to.have.property('x', x);
			}
		});
	});

	describe('#unfloat()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(30.333, 20.666);
			ret = vec.unfloat();
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should round both vector axis to integers', function () {
			expect(vec).to.have.property('x', 30);
			expect(vec).to.have.property('y', 21);
		});
	});

	describe('#mixX()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(100, 100);
			vec2 = ChainableVector(200, 200);
			ret = vec1.mixX(vec2, 0.5);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should interpolate the X axis half way', function () {
			expect(vec1).to.have.property('x', 150);
			expect(vec1).to.have.property('y', 100);
		});
	});

	describe('#mixY()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(100, 100);
			vec2 = ChainableVector(200, 200);
			ret = vec1.mixY(vec2, 0.5);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should interpolate the Y axis half way', function () {
			expect(vec1).to.have.property('x', 100);
			expect(vec1).to.have.property('y', 150);
		});
	});

	describe('#mix()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(100, 100);
			vec2 = ChainableVector(200, 200);
			ret = vec1.mix(vec2, 0.5);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec1);
		});

		it('should interpolate half way', function () {
			expect(vec1).to.have.property('x', 150);
			expect(vec1).to.have.property('y', 150);
		});
	});

	describe('#zero()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.zero();
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should interpolate half way', function () {
			expect(vec).to.have.property('x', 0);
			expect(vec).to.have.property('y', 0);
		});
	});

	describe('#horizontalAngle()', function(){

		var angleX,angleY,angleXPi;
		
		before(function(){
			angleX = ChainableVector(100,0).horizontalAngle();
			angleY = ChainableVector(0,100).horizontalAngle();
			angleXPi = ChainableVector(-100,0).horizontalAngle();
		});

		it('should x directed vector to 0°', function(){
			expect(Math.abs(angleX - 0)).to.lte(EPSILON);
		});

		it('should y directed vector to 90°', function(){
			expect(Math.abs(angleY - Math.PI/2)).to.lte(EPSILON);
		});

		it('should negative x directed vector to 180°', function(){
			expect(Math.abs(angleXPi - Math.PI)).to.lte(EPSILON);
		});
	});

	describe('#rotate()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.rotate(90 * Math.PI / 180);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should rotate the vector by certain degrees', function () {
			expect(vec).to.have.property('x', -100);
			expect(vec).to.have.property('y', 100);
			expect(Math.abs(vec.horizontalAngle() - 135 * Math.PI / 180)).to.lte(EPSILON);
		});
	});


	describe('#rotateDeg()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.rotateDeg(90);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should set the rotation angle in degrees', function () {
			expect(vec).to.have.property('x', -100);
			expect(vec).to.have.property('y', 100);
		});
	});


	describe('#rotateTo()', function(){
		var vecX,vecY, retX, retY;


		before(function(){
			vecX = ChainableVector(100,0);
			vecY = ChainableVector(0,100);
			retX = vecX.rotateTo(120 * Math.PI / 180);
			retY = vecY.rotateTo(120 * Math.PI / 180);
		});

		it('should be chainable', function(){
			expect(retX).to.equal(vecX);
		});

		it('should rotate any Vector to a given angle', function(){
			expect(vecX.horizontalAngle()).to.equal(120 * Math.PI /180);
			expect(vecY.horizontalAngle()).to.equal(120 * Math.PI /180);
		});

		it('should keep the length', function(){
			expect(retX.magnitude()).to.equal(100);
			expect(retY.magnitude()).to.equal(100);
		});

	});

	describe('#rotateToDeg()', function(){
		var vec,ret;
		before(function(){
			vec = ChainableVector(100,0);
			ret = vec.rotateToDeg(120);

		});

		it('should be chainable', function(){
			expect(ret).to.equal(vec);
		});

		it('should rotate any Vector to a given angle', function(){
			expect(Math.abs(vec.horizontalAngleDeg()-120)).to.lte(EPSILON);

		});

		it('should keep the length', function(){
			expect(ret.magnitude()).to.equal(100);
		});

	});

	describe('#rotateBy()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.rotateBy(45 * Math.PI / 180);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should rotate by the given angle', function () {
			expect(vec).to.have.property('x', -100);
			expect(vec).to.have.property('y', 100);
		});
	});

	describe('#rotateByDeg()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.rotateByDeg(45);
		});

		it('should be chainable', function () {
			expect(ret).to.equal(vec);
		});

		it('should rotate by the given angle in degrees', function () {
			expect(vec).to.have.property('x', -100);
			expect(vec).to.have.property('y', 100);
		});
	});

    describe('#project()', function () {
		var vec1, vec2, vec3, vec4, selfRet, perpRet, paraRet, middleRet;

		before(function () {
			vec1 = ChainableVector(100, 0);
			vec2 = ChainableVector(100, 100);
			vec3 = ChainableVector(0,100);
			vec4 = ChainableVector(200,0);
			selfRet = vec1.project(vec1);
			perpRet = vec1.clone().project(vec3);
			paraRet = vec1.clone().project(vec4);
			middleRet = vec1.clone().project(vec2);
		});

		it('should be chainable', function () {
			expect(selfRet).to.equal(vec1);
		});

		it('should project same vector onto itself without change', function() {
			expect(selfRet).to.have.property('x',100);
			expect(selfRet).to.have.property('y',0);
		});

		it('should project orthogonal vectors into a zero-length vector', function () {
			expect(perpRet).to.have.property('x',0);
			expect(perpRet).to.have.property('y',0);
		});

		it('should project parallel vectors into a vector of same direction and magnitude', function () {
			expect(paraRet).to.have.property('x', 100);
			expect(paraRet).to.have.property('y', 0);
		});

		it('should project non-orthogonal non-parallel vectors correctly', function () {
			expect(middleRet).to.have.property('x', 50);
			expect(middleRet).to.have.property('y', 50);
		});
	});
});

describe('regular instance methods', function () {

	describe('#clone()', function () {
		var vec1, vec2;

		before(function () {
			vec1 = ChainableVector(42, 21);
			vec2 = vec1.clone();
		});

		it('should have the same values as the original', function () {
			expect(vec1).to.not.be.equal(vec2);
			expect(vec1.x).to.equal(vec2.x);
			expect(vec1.y).to.equal(vec2.y);
		});
	});

	describe('#dot()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(42, 21);
			vec2 = ChainableVector(44, 42);
			ret = vec1.dot(vec2);
		});

		it('should return the dot product of 2 vectors', function () {
			expect(ret).to.equal(2730);
		});
	});

	describe('#distanceX()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(42, 21);
			vec2 = ChainableVector(44, 42);
			ret = vec1.distanceX(vec2);
		});

		it('should return the distance between the X axis of 2 vectors', function () {
			expect(ret).to.equal(-2);
		});
	});

	describe('#distanceY()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(42, 21);
			vec2 = ChainableVector(44, 42);
			ret = vec1.distanceY(vec2);
		});

		it('should return the distance between the Y axis of 2 vectors', function () {
			expect(ret).to.equal(-21);
		});
	});

	describe('#distance()', function () {
		var vec1, vec2, ret;

		before(function () {
			vec1 = ChainableVector(100, 100);
			vec2 = ChainableVector(200, 100);
			ret = vec1.distance(vec2);
		});

		it('should return the euclidean distance between 2 vectors', function () {
			expect(ret).to.equal(100);
		});
	});

	describe('#magnitude()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 100);
			ret = vec.magnitude();
		});

		it('should return the length of the vector', function () {
			expect(Math.round(ret)).to.equal(141);
		});
	});

	describe('#isZero()', function () {
		var vec;

		before(function () {
			vec = ChainableVector(100, 100);
			vec.zero();
		});

		it('should return true if the vector is zero', function () {
			expect(vec.isZero()).to.equal(true);
		});
	});

	describe('#isEqualTo()', function () {
		var vec1, vec2, vec3;

		before(function () {
			vec1 = ChainableVector(100, 100);
			vec2 = ChainableVector(100, 120);
			vec3 = ChainableVector(100, 120);
		});

		it('should return false if the vectors are not the same', function () {
			expect(vec1.isEqualTo(vec2)).to.equal(false);
		});
		it('should return true if the vectors are the same', function () {
			expect(vec2.isEqualTo(vec3)).to.equal(true);
		});
	});

});

describe('utility methods', function () {

	describe('#toString()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 200);
			ret = vec.toString();
		});

		it('should return a string representation of the vector', function () {
			expect(ret).to.be.a('string');
			expect(ret).to.have.string('x:100,y:200');
		});
	});

	describe('#toArray()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 200);
			ret = vec.toArray();
		});

		it('should return an array representation of the vector', function () {
			expect(ret).to.be.instanceof(Array);
			expect(ret).to.eql([ 100, 200 ]);
		});
	});

	describe('#toObject()', function () {
		var vec, ret;

		before(function () {
			vec = ChainableVector(100, 200);
			ret = vec.toObject();
		});

		it('should return an object representation of the vector', function () {
			expect(ret).to.be.instanceof(Object);
			expect(ret).to.eql({ x: 100, y: 200 });
		});
	});
});