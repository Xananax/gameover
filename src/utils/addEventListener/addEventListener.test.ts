import {addEventListener} from './addEventListener';
import {expect} from 'chai';

describe('addEventListener',()=>{
	
	function getDom(){
		return document.createElement('div');
	}
	
	describe('addEventListener(domElement)',()=>{
		it('should return a function',()=>{
			const selectType = addEventListener(getDom());
			expect(selectType).to.be.a('function');
		});
	});
	describe('addEventListener(domElement,string)',()=>{
		it('should return a function',()=>{
			const addEvent = addEventListener(getDom(),'click');
			expect(addEvent).to.be.a('function');
		});
	});
	describe('addEventListener(domElement,string,function)',()=>{
		it('should return a function',(done)=>{
			const dom = getDom();
			const addEvent = addEventListener(dom,'click');
			let clicked = 0;
			const removeEvent = addEvent(function(){
				clicked++;
			});
			dom.click();
			removeEvent();
			dom.click();
			setTimeout(function(){
				expect(clicked).to.be.lessThan(2);
				done();
			},100);
		});
	});
});