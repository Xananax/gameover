import {isFunction} from './isFunction';
import {expect} from 'chai';

describe('isFunction',()=>{
	it('should return true if the object passed is a function',()=>{
		const fn1 = (a,b)=>a+b;
		const fn2 = function(a,b){return a+b};
		const fn3 = new Function('a', 'b', 'return a + b');
		function fn4(a,b){return a+b;}
		expect(isFunction(fn1)).to.equal(true);
		expect(isFunction(fn2)).to.equal(true);
		expect(isFunction(fn3)).to.equal(true);
		expect(isFunction(fn4)).to.equal(true);
	});
	it('should return false if the object passed is not a function',()=>{
		const a = {};
		const b = 3;
		const c = 'string'
		const d = new Date();
		const e = Object.create(null);
		const f = [];
		expect(isFunction(a)).to.equal(false);
		expect(isFunction(b)).to.equal(false);
		expect(isFunction(c)).to.equal(false);
		expect(isFunction(d)).to.equal(false);
		expect(isFunction(e)).to.equal(false);
		expect(isFunction(f)).to.equal(false);
	})
});