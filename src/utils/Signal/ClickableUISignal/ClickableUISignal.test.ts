import {
	ClickableUISignal
} from './ClickableUISignal';
import {
	expect
} from 'chai';

function el(){
	return document.createElement('div');
}

function triggerMouseEvent(node,eventType){
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent(eventType,true,true);
	node.dispatchEvent(clickEvent);
}

describe('ClickableUISignal',()=>{
	describe('ClickableUISignal()',()=>{
		it('should return a signal',()=>{
			const ui = ClickableUISignal({
				'up':[el()]
			});
		});
	});
	describe('clickableUISignal',()=>{
		it('should trigger a signal and provide the name of the element',(done)=>{
			let count = 0;
			const a = el();
			const b = el();
			const c = el();
			const d = el();
			const ui = ClickableUISignal({
				'up':[a,b]
			,	'down':[c,d]
			});
			ui.add(function(vals){
				expect(vals).to.have.property('up');
				expect(vals).to.have.property('down');
				expect(vals.up).to.have.property('on');
				expect(vals.down).to.have.property('on');
				expect(vals.up.on).to.equal(true);
				expect(vals.down.on).to.equal(false);
				done()
			});
			triggerMouseEvent(a,'mousedown');
		});
		it('should return a dependency object that can be used to trigger the signal',(done)=>{
			let count = 0;
			const a = el();
			const b = el();
			const ui = ClickableUISignal({
				'up':[a]
			,	'down':[b]
			});
			ui.add(function(vals){
				expect(vals).to.have.property('up');
				expect(vals).to.have.property('down');
				expect(vals.up).to.have.property('on');
				expect(vals.down).to.have.property('on');
				expect(vals.up.on).to.equal(true);
				expect(vals.down.on).to.equal(false);
				done()
			});
			ui.deps['up'](true);
		})
	})
})