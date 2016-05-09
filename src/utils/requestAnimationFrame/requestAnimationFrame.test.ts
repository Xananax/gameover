import {requestAnimationFrame} from './requestAnimationFrame';
import {expect} from 'chai';

describe('requestAnimationFrame',()=>{
	it('should request an animation frame every 1/60th of a second',(done)=>{
		let time1 = 0;
		requestAnimationFrame(function(time){
			time1 = time;
			requestAnimationFrame(function(time){
				const diff = Math.round(time-time1);
				const a_6th = Math.round(1000/60);
				expect(diff).to.be.equal(a_6th);
				done();
			})
		})
	})
});