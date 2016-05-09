import {
	CounterSignal
,	countSignal
,	incrementSignal
,	decrementSignal
,	CounterSignalMixin
} from './CounterSignal';
import {
	Signal
,	isSignal
} from '../Signal';
import {
	createSignalFactory
} from '../createSignalFactory' 
import {
	expect
} from 'chai';

describe('CounterSignal',()=>{
	describe('CounterSignal()',()=>{
		it('should create a counter signal',()=>{
			const s = CounterSignal();
			expect(s).to.have.property('increment');
			expect(s).to.have.property('decrement');	
		});
		it('should create sub-signals that are all counter signals',()=>{
			const s = CounterSignal();
			const s2 = s.fork();
			expect(s2).to.have.property('increment');
			expect(s2).to.have.property('decrement');
		});
	});
	describe('CounterSignalMixin(signal)',()=>{
		it('should augment a signal with the increment and decrement methods',()=>{
			const s = Signal();
			CounterSignalMixin(s);
			expect(s).to.have.property('increment');
			expect(s).to.have.property('decrement');
		});
		it('should not create sub signals that are counter signals',()=>{
			const s = Signal();
			CounterSignalMixin(s);
			const s2 = s.fork();
			expect(s2).to.not.have.property('increment');
			expect(s2).to.not.have.property('decrement');
		});
	});
	describe('counterSignal.increment()',()=>{
		it('should return a new CounterSignalMixin',()=>{
			const s = CounterSignal();
			const inc = s.increment();
			expect(inc).to.have.property('increment');
			expect(inc).to.have.property('increment');
			expect(isSignal(inc)).to.equal(true);
		});
		it('should count occurences of call',()=>{
			let count = 0;
			const s = CounterSignal();
			const inc = s.increment();
			inc.add(()=>count++);
			s();
			s();
			s();
			expect(inc.value).to.equal(count);
			expect(inc.value).to.equal(3);
			expect(s.value).to.equal(undefined);
		});
	});
	describe('counterSignal.decrement()',()=>{
		it('should return a new CounterSignalMixin',()=>{
			const s = CounterSignal();
			const inc = s.decrement();
			expect(inc).to.have.property('increment');
			expect(inc).to.have.property('increment');
			expect(isSignal(inc)).to.equal(true);
		});
		it('should count occurences of call',()=>{
			let count = 3;
			const s = CounterSignal();
			const inc = s.decrement();
			inc.add(()=>count--);
			s();
			s();
			s();
			expect(count).to.equal(0);
			expect(inc.value).to.equal(-3);
			expect(s.value).to.equal(undefined);
		});
	});
	describe('createSignalFactory([CounterSignalMixin])',()=>{
		it('should be compatible with createSignalFactory',()=>{
			createSignalFactory([CounterSignalMixin]);
		});
		it('should return a factory that creates counter Signals',()=>{
			const factory = createSignalFactory([CounterSignalMixin]);
			const s = factory();
			expect(s).to.have.property('increment');
			expect(s).to.have.property('decrement');
		});
		it('should return sub signals that are CounterSignalMixins',()=>{
			const factory:SignalFactory<CounterSignal> = <SignalFactory<CounterSignal>>createSignalFactory([CounterSignalMixin]);
			const s = factory();
			const s2 = s.fork();
			expect(s2).to.have.property('increment');
			expect(s2).to.have.property('decrement');
		});
	});
});