import {DomSignal} from './DomSignal';
import {expect} from 'chai';

function createNode():HTMLElement{
	const div = document.createElement('div');
	return div;
}

describe.skip('DomSignal',()=>{
	describe('DomSignal(node:HTMLElement)',()=>{
		it('should have a value of HTMLElement',()=>{
			
		});
		it('should return a signal',()=>{
			
		});
		it('should return a signal with property `on`',()=>{
			
		});
	});
	describe('DomSignal(node:HTMLElement,type:string)',()=>{
		
	});
	describe('DomSignal(node:HTMLElement).on(type)',()=>{
		it('should create a signal that reacts to a dom element',()=>{
			
		});
		it('should return the same signal if called with the same type a second time',()=>{
			
		});
	});
});