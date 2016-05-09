import {removeEventListener} from './removeEventListener';
import {expect} from 'chai';

describe('removeEventListener',()=>{
	
	function getDom(){
		return document.createElement('div');
	}
	
	describe('removeEventListener(domElement)',()=>{
		it('should return a function',()=>{
			const selectType = removeEventListener(getDom());
			expect(selectType).to.be.a('function');
		});
	});
	describe('removeEventListener(domElement,string)',()=>{
		it('should return a function',()=>{
			const removeEvent = removeEventListener(getDom(),'click');
			expect(removeEvent).to.be.a('function');
		});
	});
	describe('removeEventListener(domElement,string,function)',()=>{
		it('should return a function',(done)=>{
			const dom = getDom();
			const removeEvent = removeEventListener(dom,'click');
			let clicked = 0;
			const callback = function(){
				clicked++;
			}
			dom.addEventListener('click',callback);
			dom.click();
			removeEvent(callback);
			dom.click();
			setTimeout(function(){
				expect(clicked).to.be.lessThan(2);
				done();
			})
		});
	});
});