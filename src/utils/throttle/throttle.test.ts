import {throttle} from './throttle';
import {expect} from 'chai';

describe('throttle',()=>{
	
	function test(interval:number,expectation:number,done:Function){
		
		const timerInterval = 10;
		const max = 50;
		let timer = null;
		let triggerCounter = 0;
		let timerCounter = 0;
		
		const trigger = throttle(function(){
			triggerCounter++;
		},interval||throttle.defaultInterval);
		
		const counter = function(){
			timerCounter++;
			if(timerCounter>=max){
				try{
					expect(triggerCounter).to.equal(expectation);
					done();
				}catch(e){
					done(e);
				}
				return;
			}
			trigger();
			timer = setTimeout(counter,timerInterval);
		}
		
		counter();
		
	}
	
	describe('throttle(fn)',()=>{
		it('should run the function at most once every 100ms',(done)=>{
			test(null,5,done);
		});
	});
	describe('throttle(fn,N)',()=>{
		it('should run the function at most once every Nms',(done)=>{
			test(50,10,done);
		});
	});
});