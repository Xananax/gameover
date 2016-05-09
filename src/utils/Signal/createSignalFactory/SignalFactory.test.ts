import {Signal,isSignal} from '../Signal';
import createSignalFactory from './SignalFactory';
import {expect} from 'chai';

function getMixins(){
	return [
		function(s){
			s.a = 'a'
		}
	,	function(s){
			s.b = ()=>{}
		}
	,	function(s){
			s.c = 0;
		}
	]
}

describe('SignalFactory',()=>{
	describe('SignalFactory()',()=>{
		it('should return the default constructor',()=>{
			const factory = createSignalFactory();
			expect(factory).to.equal(Signal);
		});
	});
	
	describe('SignalFactory([constructor,constructor])',()=>{
		it('should return a function',()=>{
			const factory = createSignalFactory(getMixins());
			expect(factory).to.be.a('function');
		});
	});
	
	describe('SignalFactory(countructors)()',()=>{
		it('should return a signal',()=>{
			const factory = createSignalFactory(getMixins());
			const signal = factory();
			const isIt = isSignal(signal);
			expect(isIt).to.equal(true);
		});
		it('should return a signal augmented by all the constructors',()=>{
			const factory = createSignalFactory(getMixins());
			const signal = factory();
			expect(signal).to.have.property('a');
			expect(signal).to.have.property('b');
			expect(signal).to.have.property('c');
		});
		it('should return a signal who\'s child signals are also augmented by the same constructors',()=>{
			const factory:SignalFactory<Signal<any,any>> = <SignalFactory<Signal<any,any>>>createSignalFactory(getMixins());
			const signal = factory();
			const signal2 = signal.fork();
			expect(signal2).to.have.property('a');
			expect(signal2).to.have.property('b');
			expect(signal2).to.have.property('c');
		});
	});
})