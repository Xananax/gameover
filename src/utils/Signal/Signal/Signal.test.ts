import Signal,{isSignal} from './Signal';
import {expect} from 'chai';

describe('Signal',()=>{
	it('should be a function',()=>{
		const s = Signal();
		expect(s).to.be.a('function');
	});
	describe('Signal.add(fn)',()=>{
		it('should set a listener',(done)=>{
			const s = Signal();
			s.add(done);
			s();
		});
		it('should return a function to remove the listener',(done)=>{
			let called = 0;
			const s = Signal();
			const remove = s.add(function(){
				called++;
			});
			s();
			remove();
			s();
			setTimeout(function(){
				expect(called).to.be.lessThan(2);
				done()
			},10);
		});
	});
	describe('Signal.add(fn,true)',()=>{
		it('should add a listener that will trigger only once',(done)=>{
			let called = 0;
			const s = Signal();
			const remove = s.add(function(){
				called++;
			},true);
			s();
			s();
			s()
			setTimeout(function(){
				expect(called).to.be.lessThan(2);
				done()
			},10);
		});
	});
	describe('Signal(value)',()=>{
		it('should set the initial value',()=>{
			const s = Signal('value');
			expect(s.value).to.equal('value');
		});
	});
	describe('s(value)',()=>{
		it('should trigger all registered listeners',()=>{
			let called = 0;
			const s = Signal();
			function getCallback(){
				return ()=>{called++;}
			};
			s.add(getCallback());
			s.add(getCallback());
			s.add(getCallback());
			s.add(getCallback());
			s();
			setTimeout(function(){
				expect(called).to.equal(4);
			},10)
		});	
	})
	describe('Signal.map(fn)',()=>{
		it('should return a new signal',()=>{
			let s = Signal();
			let s2 = s.map(()=>{});
			expect(isSignal(s2)).to.equal(true);
			expect(s2).to.not.equal(s);
		});
		it('should map the values',(done)=>{
			let s = Signal();
			let s2 = s.map((v)=>v+1);
			s2.add(function(val){
				expect(val).to.equal(2);
				done()
			});
			s(1);
		});
	});
	describe('Signal.reduce(fn)',()=>{
		it('should return a new signal',()=>{
			let s = Signal();
			let s2 = s.reduce(()=>{});
			expect(isSignal(s2)).to.equal(true);
			expect(s2).to.not.equal(s);
		});
		it('should reduce the value',(done)=>{
			let s = Signal(1);
			let s2 = s.reduce((prev,v)=>prev+v);
			s(1);
			s(1);
			s(1);
			s(1);
			setTimeout(function(){
				expect(s2.value).to.equal(5);
				done();
			},20)
		});
	});
	describe('Signal.filter(fn)',()=>{
		it('should return a new signal',()=>{
			let s = Signal();
			let s2 = s.filter(()=>{});
			expect(isSignal(s2)).to.equal(true);
			expect(s2).to.not.equal(s);
		});
		it('should filter the values',(done)=>{
			let s = Signal();
			const arr = [];
			let s2 = s.filter(function(val){
				return (val%2==0);
			});
			s2.add(function(val){
				arr.push(val);
			});
			s(1);
			s(2);
			s(3);
			s(4);
			s(5);
			s(6);
			setTimeout(function(){
				expect(arr).to.eql([2,4,6]);
				done();
			},10);
		});
	});
	describe('Signal.noDuplicates',()=>{
		describe('Signal.noDuplicates',()=>{
			it('should not call any listener if the passed value is equal to the previous value',(done)=>{
				const s = Signal('a')
				s.noDuplicates = true;
				let called = 0;
				s.add(()=>called++);
				s('a');
				s('a');
				s('a');
				s('a');
				s('b');//call
				s('b');
				s('b');
				s('c');//call
				s('c');
				setTimeout(function(){
					expect(called).to.equal(2);
					done();
				})
			});
		});
	})
	describe('Signal.dispose()',()=>{
		it('should remove all listeners',()=>{
			let called = 0;
			const s = Signal();
			function getCallback(){
				return ()=>{called++;}
			};
			s.add(getCallback());
			s.add(getCallback());
			s.add(getCallback());
			s.add(getCallback());
			s();
			s();
			s.dispose();
			s();
			setTimeout(function(){
				expect(called).to.equal(8);
			},10)
		});
	});
});