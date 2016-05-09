import {now} from './now';
import {expect} from 'chai';

describe('now',()=>{
	it('should return the current time',()=>{
		const n = now();
		expect(n).to.be.a('number');
	})
});