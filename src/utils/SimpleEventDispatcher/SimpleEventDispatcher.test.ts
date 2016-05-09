import {SimpleEventDispatcher} from './SimpleEventDispatcher';
import {expect} from 'chai';

describe('SimpleEventDispatcher',()=>{
	describe('SimpleEventDispatcher()',()=>{
		it('should return a dispatcher',()=>{
			const s = SimpleEventDispatcher();
			expect(s).to.have.property('addEventListener');
			expect(s).to.have.property('removeEventListener');
			expect(s).to.have.property('dispatchEvent');
			expect(s).to.have.property('dispose');
			expect(s).to.have.property('size');
		});
		it('should return bound functions',()=>{
			const s = SimpleEventDispatcher();
			const size = s.size;
			s.addEventListener(()=>{});
			expect(size()).to.equal(s.size());
		})
	});
	describe('SimpleEventDispatcher(obj)',()=>{
		it('should augment the object with simple event dispatcher capabilities',()=>{
			const s = {a:'b'};
			SimpleEventDispatcher(s);
			expect(s).to.have.property('addEventListener');
			expect(s).to.have.property('removeEventListener');
			expect(s).to.have.property('dispatchEvent');
			expect(s).to.have.property('dispose');
			expect(s).to.have.property('size');
			expect(s).to.have.property('a');
		});
	});
	describe('dispatcher.addEventListener(()=>{}|{handlEvent()},once?:boolean)',()=>{
		it('should add an event listener',()=>{
			let count = 0;
			const s = SimpleEventDispatcher();
			expect(s.size()).to.equal(0);
			s.addEventListener(()=>{count++});
			s.dispatchEvent();
			s.dispatchEvent();
			expect(s.size()).to.equal(1);
			expect(count).to.equal(2);
		});
		it('should accept an event handler object',()=>{
			const s = SimpleEventDispatcher();
			s.addEventListener({
				handleEvent:()=>{}
			});
			expect(s.size()).to.equal(1);
		});
		it('should throw if the argument passed is not a function',()=>{
			const s = SimpleEventDispatcher();
			const addEventListener = s.addEventListener;
			expect(()=>addEventListener(<EventListener>null)).to.throw();
			expect(()=>addEventListener(<EventListener>{})).to.throw();
		});
		it('should return a function to remove the event listener',()=>{
			let count = 0;
			const s = SimpleEventDispatcher();
			const remove = s.addEventListener(()=>{count++});
			s.dispatchEvent();
			remove();
			s.dispatchEvent();
			expect(count).to.equal(1);
		});
		it('should trigger an event listener only once if called with the `once` argument',()=>{
			let count = 0;
			const s = SimpleEventDispatcher();
			s.addEventListener(()=>{count++},true);
			s.dispatchEvent();
			s.dispatchEvent();
			expect(count).to.equal(1);
		})
	});
	describe('dispatcher.removeEventListener(()=>{}|{handlEvent()})',()=>{
		it('should remove the event',()=>{
			let count = 0;
			const fn = ()=>{count++};
			const s = SimpleEventDispatcher();
			s.addEventListener(fn);
			s.dispatchEvent();
			s.removeEventListener(fn);
			s.dispatchEvent();
			expect(count).to.equal(1);
		});
	});
	describe('dispatcher.dispatchEvent(any)',()=>{
		it('should dispatch the event to all listeners',()=>{
			let count = 0;
			const fn = ()=>{count++};
			const s = SimpleEventDispatcher();
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.dispatchEvent();
			expect(count).to.equal(4);
		});
	});
	describe('dispatcher.dispose()',()=>{
		it('should remove all listeners',()=>{
			let count = 0;
			const fn = ()=>{count++};
			const s = SimpleEventDispatcher();
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.dispose();
			expect(count).to.equal(0);
		});
	});
	describe('dispatcher.size()',()=>{
		it('should reflect the number of attached listeners',()=>{
			const fn = ()=>{};
			const s = SimpleEventDispatcher();
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			s.addEventListener(fn);
			expect(s.size()).to.equal(4);
			s.dispose();
			expect(s.size()).to.equal(0);
		});
	});
})