import {assign} from './assign';
import {expect} from 'chai';

describe('assign',()=>{
	it('should return an empty object if called without arguments',()=>{
		const obj:any = assign();
		expect(obj).to.be.an('object');
	});
	it('should assign objects properties from right to left',()=>{
		const a:any = {a:'A'};
		const b:any = {b:'B'};
		const c:any = {b:'C',c:'C'};
		const obj:any = assign(a,b,c);
		expect(obj).to.have.property('a');
		expect(obj).to.have.property('b');
		expect(obj).to.have.property('c');
		expect(obj.b).to.equal('C');
	});
	it('should return an object that is modelled from NULL',()=>{
		const a:any = {a:'A'};
		const obj:any = assign(a);
		let i = 0;
		for(let n in obj){i++;}
		expect(i).to.equal(1);
	});
	it('should create a new object',()=>{
		const a:any = {a:'A'};
		const obj:any = assign(a);
		a.a = 'B';
		expect(obj.a).to.equal('A');
	});
});
