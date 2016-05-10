import {
	KeyboardLayout
} from './KeyboardLayout';
import {expect} from 'chai';

describe('KeyboardLayout',()=>{
	describe('KeyboardLayout()=>layout',()=>{
		it('should return a function',()=>{
			const keyCode = KeyboardLayout();
			expect(keyCode).to.be.a('function');		
		});
	});
	describe('layout(name)',()=>{
		it('should return a number',()=>{
			const keyCode = KeyboardLayout();
			const code = keyCode('enter');
			expect(code).to.equal(13);
		});
		it('should return null if the name is not found',()=>{
			const keyCode = KeyboardLayout();
			const code = keyCode('does not exist');
			expect(code).to.equal(null);
		});
	});
});