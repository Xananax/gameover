import {
	onMouseUp
,	onMouseDown
,	onMouseMove
,	onClick
,	onDoubleClick
} from './onClickTouch';
import {expect} from 'chai';

function getElement(){
	const el = document.createElement('div');
	return el;
}

function triggerMouseEvent(node,eventType){
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent(eventType,true,true);
	node.dispatchEvent(clickEvent);
}

describe('onClickTouch',()=>{
	describe('onMouseDown',()=>{
		it('should trigger on mouse down',(done)=>{
			const el = getElement();
			onMouseDown(el,()=>done());
			triggerMouseEvent(el,'mousedown');
		});		
	});
	describe('onMouseUp',()=>{
		it('should trigger on mouse up',(done)=>{
			const el = getElement();
			onMouseUp(el,()=>done());
			triggerMouseEvent(el,'mouseup');
		});
	});
	describe('onMouseMove',()=>{
		it('should trigger on mouse move',(done)=>{
			const el = getElement();
			onMouseMove(el,()=>done());
			triggerMouseEvent(el,'mousemove');
		});
	});
	describe('onClick',()=>{
		it('should trigger on mouse down then on mouse up',(done)=>{
			const el = getElement();
			onClick(el,()=>done());
			triggerMouseEvent(el,'click');
		});
	});
	describe('onDoubleClick',()=>{
		it('should trigger on mouse up and mouse down twice',(done)=>{
			const el = getElement();
			onDoubleClick(el,()=>done());
			triggerMouseEvent(el,'dblclick');
		});
	});
})