import {
	isSignal
} from '../Signal';
import {
	ClickableSignal
} from './ClickableSignal';
import {expect} from 'chai';

function createElement(){
	return document.createElement('div');
}

function triggerMouseEvent(node,eventType){
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent(eventType,true,true);
	node.dispatchEvent(clickEvent);
}

describe('ClickableSignal',()=>{
	describe('ClickableSignal()',()=>{
		it('should return a signal',()=>{
			const clickableSignal = ClickableSignal(createElement());
			expect(clickableSignal).to.be.a('function');
			expect(isSignal(clickableSignal)).to.equal(true);
		});
	});
	describe('clickableSignal',()=>{
		it('should trigger true when an object is clicked',(done)=>{
			const el = createElement();
			const clickableSignal = ClickableSignal(el);
			clickableSignal.add(function(val){
				expect(val.on).to.equal(true);
				expect(!!val.stop).to.equal(false);
				expect(!!val.start).to.equal(true);
				done()
			});
			triggerMouseEvent(el,'mousedown');
		});
		it('should also trigger false when an object is unclicked',(done)=>{
			const el = createElement();
			const clickableSignal = ClickableSignal(el,true);
			clickableSignal.add(function(val){
				expect(val.on).to.equal(false);
				expect(!!val.stop).to.equal(true);
				expect(!!val.start).to.equal(false);
				done()
			});
			triggerMouseEvent(el,'mouseup');
		});
	})
});