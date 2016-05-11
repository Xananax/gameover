import {
	hasClass
,	addClass
,	removeClass
} from './classHelpers';
import {
	expect
} from 'chai';

function getElement(className?:string):HTMLElement{
	const div = document.createElement('div');
	if(className){div.className = className;}
	return div;
}

describe.only('classHelpers',()=>{
	describe('hasClass(string)',()=>{
		it('should return a function',()=>{
			const has = hasClass('a');
			expect(has).to.be.a('function');
		});
	});
	describe('hasClass(string,node)',()=>{
		it('should return a function',()=>{
			const has = hasClass('a',getElement());
			expect(has).to.be.a('function');
		});
	});
	describe('hasClass(string,node)()',()=>{
		it('should return true if the node has the class',()=>{
			const el = getElement('abcde fghij');
			const has = hasClass('abcde',el);
			const has2 = hasClass('fghij',el);
			const has3 = hasClass('fg',el);
			expect(has()).to.equal(true);
			expect(has2()).to.equal(true);
			expect(has3()).to.equal(false);
		});
	});
	describe('addClass(string)',()=>{
		it('should return a function',()=>{
			const add = addClass('a');
			expect(add).to.be.a('function');
		});
	});
	describe('addClass(string,node)',()=>{
		it('should return a function',()=>{
			const add = addClass('a',getElement());
			expect(add).to.be.a('function');
		});
	});
	describe('addClass(string,node)()',()=>{
		it('should add the class',()=>{
			const el = getElement('abcde fghij');
			const add = addClass('abcde',el);
			const add2 = addClass('klmn',el);
			const add3 = addClass('fg',el);
			add();
			add2();
			add3();
			expect(el.className).to.equal('abcde fghij klmn fg');
		});
	});
	describe('removeClass(string)',()=>{
		it('should return a function',()=>{
			const remove = removeClass('a');
			expect(remove).to.be.a('function');
		});
	});
	describe('removeClass(string,node)',()=>{
		it('should return a function',()=>{
			const remove = removeClass('a',getElement());
			expect(remove).to.be.a('function');
		});
	});
	describe('removeClass(string,node)()',()=>{
		it('should return true if the node has the class',()=>{
			const el = getElement('abcde fghj');
			const remove = removeClass('abcde',el);
			const remove2 = removeClass('gh',el);
			const remove3 = removeClass('fghj',el);
			remove();
			remove2();
			remove3();
			expect(el.className).to.equal('');
		});
	});
})