import {getRandomValueFromArray} from './getRandomValueFromArray';
import {expect} from 'chai';

describe('getRandomValueFromArray',()=>{
	describe('getRandomValueFromArray(arr)',()=>{
		it('should return a function',()=>{
			const arr = ['a','b','c'];
			const rand = getRandomValueFromArray(arr);
			expect(rand).to.be.a('function');
		});
		it('should always return a value from the array',()=>{
			const arr = ['a','b','c'];
			const rand = getRandomValueFromArray(arr);
			let i = 2000;
			while(i--){
				const ret = rand();
				expect(ret).to.match(/^(a|b|c)$/);
			}
		})
		it('should close around the array',()=>{
			const arr = [];
			const rand = getRandomValueFromArray(arr);
			arr.push('a','b','c');
			let i = 2000;
			while(i--){
				const ret = rand();
				expect(ret).to.match(/^(a|b|c)$/);
			}
		});
		describe('getRandomValueFromArray(arr)(function)',()=>{
				it('should call a custom function',()=>{
			const arr = [];
			const rand = getRandomValueFromArray(arr);
			arr.push('a','b','c');
			let i = 2000;
			const provideRandom = function(){return 0;}
				while(i--){
					const ret = rand(provideRandom);
					expect(ret).to.match(/^(a)$/);
				}
			});	
		})
	});
	describe('getRandomValueFromArray(arr,function)',()=>{
		it('should call the custom function',()=>{
			const arr = [];
			arr.push('a','b','c');
			let i = 2000;
			const provideRandom = function(){return 1;}
			while(i--){
				const ret = getRandomValueFromArray(arr,provideRandom)
				expect(ret).to.match(/^(c)$/);
			}
		});
	});
});