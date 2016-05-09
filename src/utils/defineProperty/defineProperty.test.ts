import {
	defineProperty
,	createPropertyConfiguration
,	WRITABLE
,	CONFIGURABLE
,	VISIBLE
,	OVERRIDE
,	EDITABLE
,	REGULAR
} from './defineProperty';
import {expect} from 'chai';

describe('defineProperty',()=>{
	describe('defineProperty(flags)',()=>{
		it('should return a function',()=>{
			const def = defineProperty(WRITABLE);
			expect(def).to.be.a('function');
		})
	});
	describe('defineProperty(flags,obj)',()=>{
		it('should return a function',()=>{
			const obj:any = {};
			const def = defineProperty(WRITABLE,obj);
			expect(def).to.be.a('function');
		})
	});
	describe('defineProperty(flags,obj,name,value)',()=>{
		describe('defineProperty(0,obj,name,value)',()=>{
			it('should add a configurable, editable, but invisible property to the object',()=>{
				const obj:any = {};
				const def = defineProperty(0,obj);
				def('property','a');
				expect(obj).to.have.property('property');
				expect(obj.property).to.equal('a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:false
				,	configurable:false
				,	writable:false
				,	value:'a'
				});
			});
			it('should throw an error when the property already exists',()=>{
				const obj:any = {property:'b'};
				function def(){
					defineProperty(0,obj,'property','a');	
				}
				expect(def).to.throw();
			});
			it('should overwrite an existing property if OVERRIDE is set',()=>{
				const obj:any = {property:'b'};
				function def(){
					defineProperty(OVERRIDE,obj,'property','a');	
				}
				expect(def).to.not.throw();
				expect(obj).to.have.property('property');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:false
				,	configurable:false
				,	writable:false
				,	value:'a'
				});
			});
		})
		describe('defineProperty(REGULAR,obj,name,value)',()=>{
			it('should add a normal property to the object',()=>{
				const obj:any = {};
				defineProperty(REGULAR,obj,'property','a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:true
				,	configurable:true
				,	writable:true
				,	value:'a'
				});
			});
		})
		describe('defineProperty(WRITABLE,obj,name,value)',()=>{
			it('should add a writable property to the object',()=>{
				const obj:any = {};
				defineProperty(WRITABLE,obj,'property','a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:false
				,	configurable:false
				,	writable:true
				,	value:'a'
				});				
			});
		})
		describe('defineProperty(CONFIGURABLE,obj,name,value)',()=>{
			it('should add a configurable property to the object',()=>{
				const obj:any = {};
				defineProperty(CONFIGURABLE,obj,'property','a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:false
				,	configurable:true
				,	writable:false
				,	value:'a'
				});	
			})
		})
		describe('defineProperty(VISIBLE,obj,name,value)',()=>{
			it('should add a visible property to the object',()=>{
				const obj:any = {};
				defineProperty(VISIBLE,obj,'property','a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:true
				,	configurable:false
				,	writable:false
				,	value:'a'
				});
			});
		});
		describe('defineProperty(EDITABLE,obj,name,value)',()=>{
			it('should add a writable & configurable property to the object',()=>{
				const obj:any = {};
				defineProperty(EDITABLE,obj,'property','a');
				expect(obj).to.have.ownPropertyDescriptor('property',{
					enumerable:false
				,	configurable:true
				,	writable:true
				,	value:'a'
				});
			})
		});
		describe('defineProperty(EDITABLE,obj,name,value,{get,set})',()=>{
			it('should add getters and setters to the object',()=>{
				const obj:any = {};
				defineProperty(EDITABLE,obj,'property','a',{
					get:function(val){
						return val+'a';
					}
				,	set:function(val){
						return val+'a';
					}
				});
				expect(obj).to.have.property('property');
				obj.property = 'b';
				const returned = obj.property;
				expect(returned).to.equal('baa');
			})
		});
	});
});