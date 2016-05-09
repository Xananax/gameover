import {debounce} from './debounce';
import {expect} from 'chai';

describe('debounce',()=>{
	
	function test(done,delay,expectation,runStart){
		let times = 30;
		let hasRun = 0;
		let timer = null;
		const trigger = function(){hasRun++;}
		const debounced = debounce(trigger,delay||debounce.defaultDelay,runStart);
		function counterDone(){
			try{
				expect(hasRun).to.equal(expectation);
				done();	
			}catch(e){
				return done(e);
			}
		}
		function counter(){
			times--;
			if(!times){
				return setTimeout(counterDone,delay||debounce.defaultDelay)
			}
			debounced();
			timer = setTimeout(counter,50);
		}
		counter();		
	}
	
	describe('debounce(function,delay)',()=>{
		it('should run the provided function only once per N milliseconds',(done)=>{
			test(done,100,1,false);
		});	
	});
	describe('debounce(function,delay,true)',()=>{
		it('should also run the function at the start',(done)=>{
			test(done,100,2,true);
		});	
	});
	describe('debounce(function)',()=>{
		it('should default delay to 250ms',(done)=>{
			test(done,null,1,false);
		});	
	});
});