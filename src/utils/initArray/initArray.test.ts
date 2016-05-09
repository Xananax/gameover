import {initArray} from './initArray';
import {expect} from 'chai';

describe('initArray',()=>{
	describe('initArray(fill)',()=>{
		it('should return a function',()=>{
			const init = initArray();
			expect(init).to.be.a('function');
		});
	});
	describe('initArray(null)(0)',()=>{
		it('should create an array with no elements',()=>{
			const init = initArray();
			const arr = init();
			expect(init).to.be.a('function');
			expect(arr).to.be.an('array');
		});
	});
	describe('initArray(null)(N)',()=>{
		it('should create an array with N elements that equal null',()=>{
			const init = initArray();
			const arr = init(7);
			expect(init).to.be.a('function');
			expect(arr).to.be.an('array');
			expect(arr.length).to.equal(7);
			arr.forEach(function(element){
				expect(element).to.equal(null);
			})
		});
	});
	describe('initArray(fn)(N)',()=>{
		it('should return a function that can be applied to create arrays of N size',()=>{
			const init = initArray((i)=>'a'+i);
			const arr = init(7);
			expect(init).to.be.a('function');
			expect(arr).to.be.an('array');
			expect(arr.length).to.equal(7);
			arr.forEach(function(element,index){
				expect(element).to.equal('a'+index);
			})
		})
	})
});