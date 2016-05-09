import {Signal,isSignal} from '../Signal';
import CombinedSignal from './CombinedSignal';
import {expect} from 'chai';

describe('CombinedSignal',()=>{
	describe('CombinedSignal({})',()=>{
		it('should create a Signal that reacts to any change in the given object',(done)=>{
			const deps:SignalsObject = {
				a:Signal('a')
			,	b:Signal('b')
			};
			const signal = CombinedSignal(deps);
			signal.add(function(vals){
				expect(vals).to.be.an('object');
				expect(vals).to.have.property('a');
				expect(vals.a).to.equal('A');
				done();
			});
			deps['a']('A');
		});
	});
	describe('CombinedSignal([])',()=>{
		it('should create a Signal that reacts to any change in the given array',(done)=>{
			const deps = [
				Signal('a')
			,	Signal('b')
			];
			const signal = CombinedSignal(deps);
			signal.add(function(vals){
				expect(vals).to.be.an('array');
				expect(vals[0]).to.equal('A');
				done();
			});
			deps[0]('A');
		});
	});
	describe('CombinedSignal({},fn)',()=>{
		it('should pass the changed object to the function fn',(done)=>{
			const deps:SignalsObject = {
				a:Signal('a')
			,	b:Signal('b')
			};
			const signal = CombinedSignal(deps,function(vals){
				return (vals.a+vals.b);
			});
			signal.add(function(vals){
				expect(vals).to.equal('Ab');
				done();
			});
			deps['a']('A');
		});
	});
	describe('CombinedSignal([],fn)',()=>{
		it('should pass the changed array to the function fn',(done)=>{
			const deps = [
				Signal('a')
			,	Signal('b')
			];
			const signal = CombinedSignal(deps,function(vals){
				return vals.join(':')
			});
			signal.add(function(vals){
				expect(vals).to.equal('A:b');
				done();
			});
			deps[0]('A');
		});
	});
});