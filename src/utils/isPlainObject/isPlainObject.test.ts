import {isPlainObject} from './isPlainObject';
import {expect} from 'chai';

describe('isPlainObject',()=>{
	it('should return true if the object is a plain object',()=>{
		const a = {};
		expect(isPlainObject(a)).to.equal(true);
	});
	it('should return false if the object had a NULL prototype',()=>{
		const a = Object.create(null);
		expect(isPlainObject(a)).to.equal(false);
	});
	it('should return false on objects created by constructors',()=>{
		const a = new Date();
		class B{}
		const b = new B();
		expect(isPlainObject(a)).to.equal(false);
		expect(isPlainObject(b)).to.equal(false);
	})
});