import {isPromise} from './isPromise';
import {expect} from 'chai';

describe('isPromise',()=>{
	it('should return true if the object has a then property and if the property is a function',()=>{
		var a = new Promise(function(resolve,reject){});
		var b = {then:function(){}}
		expect(isPromise(a)).to.equal(true);
		expect(isPromise(b)).to.equal(true);
	});
	it('should return false if the object does not have a then property',()=>{
		var a = {};
		expect(isPromise(a)).to.equal(false);
	});
	it('should return false if the object\'s \'then\' property is not a function',()=>{
		var a = {then:'then'};
		expect(isPromise(a)).to.equal(false);
	});
});