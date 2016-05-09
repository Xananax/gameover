import {loop,SKIP,BREAK} from './loop';
import {expect} from 'chai';

describe('loop',()=>{
	describe('loop(value)',()=>{
		it('should return a function',()=>{
			const l = loop({});
			expect(l).to.be.a('function');
		});
	});
	describe('loop(value,operator)',()=>{
		it('should return a function',()=>{
			const l = loop({},()=>{});
			expect(l).to.be.a('function');
		});
	});
	describe('loop(value)(operator)',()=>{
		it('should return a function',()=>{
			const l = loop({})(()=>{});
			expect(l).to.be.a('function');
		});
	});
	describe('loop(A,operator,A)',()=>{
		describe('loop(A:string,operator,A:string)',()=>{
			it('should change the string in place',()=>{
				const transform = (letter,index)=>index+1;
				const loopString = loop('string',transform);
				expect(loopString('string')).to.equal('123456')
			});
		});
		describe('loop(A:array,operator,A:array)',()=>{
			it('should change the array',()=>{
				const transform = (letter,index)=>index+1;
				const arr = 'abcdef'.split('');
				const loopArray = loop(arr,transform,arr);
				expect(arr).to.be.eql([1,2,3,4,5,6])
			});
		});
		describe('loop(A:Object,operator,A:Object)',()=>{
			it('should change the object',()=>{
				const transform = (val)=>val+'A';
				const obj = {'a':'A','b':'B'};
				const loopObj = loop(obj,transform,obj);
				expect(obj).to.have.property('a');
				expect(obj.a).to.be.equal('AA');
				expect(obj.b).to.be.equal('BA');
			});
		});
	});
	describe('loop(A,operator,B)',()=>{
		describe('loop(A:string,operator)',()=>{
			it('should return a new string',()=>{
				const transform = letter=>letter+'a';
				const loopString = loop('string',transform);
				expect(loopString()).to.equal('sataraianaga')
			});
		});
		describe('loop(A:array,operator,B?:array)',()=>{
			it('should append to the array if provided',()=>{
				const transform = (letter,index)=>index+1;
				const arr = 'abcdef'.split('');
				const arr2 = [];
				const loopArray = loop(arr,transform);
				loopArray(arr2);
				expect(arr2).to.be.eql([1,2,3,4,5,6])	
			});
			it('should return a new array if none was passed',()=>{
				const transform = (letter,index)=>index+1;
				const arr = 'abcdef'.split('');
				const loopArray = loop(arr,transform);
				const arr2 = loopArray();
				expect(arr2).to.be.eql([1,2,3,4,5,6])
			});
		});
		describe('loop(A:Object,operator,B?:Object)',()=>{
			it('should overload the B object if provided',()=>{
				const transform = (val)=>val+'A';
				const obj = {'a':'A','b':'B'};
				const obj2:any = {};
				const loopObj = loop(obj,transform);
				loopObj(obj2);
				expect(obj2).to.have.property('a');
				expect(obj2.a).to.be.equal('AA');
				expect(obj2.b).to.be.equal('BA');
			});
			it('should return a new object if none was passed',()=>{
				const transform = (val)=>val+'A';
				const obj = {'a':'A','b':'B'};
				const loopObj = loop(obj,transform);
				const obj2:any = loopObj();
				expect(obj2).to.have.property('a');
				expect(obj2.a).to.be.equal('AA');
				expect(obj2.b).to.be.equal('BA');
			});
		});
	});
	describe('BREAK',()=>{
		it('should break the loop',()=>{
			const transform = (letter,index)=>BREAK;
			const arr = 'abcdef'.split('');
			const loopArray = loop(arr,transform,arr);
			expect(arr).to.be.eql(['a','b','c','d','e','f']);
		});
	});
	describe('SKIP',()=>{
		it('should skip corresponding values when returned',()=>{
			const transform = (letter,index)=>(index%2==0)?SKIP:letter;
			const arr = 'abcdef'.split('');
			const loopArray = loop(arr,transform);
			const arr2 = loopArray();
			expect(arr2).to.be.eql(['b','d','f']);
		});
	});
	describe('no changes',()=>{
		it('should return the original object',()=>{
			const transform = (letter,index)=>SKIP;
			const arr = 'abcdef'.split('');
			const loopArray = loop(arr,transform);
			const arr2 = loopArray();
			expect(arr2).to.be.equal(arr);
		})
	})
});