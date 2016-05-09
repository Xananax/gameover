import {isHTMLElement,isNode} from './isHTMLElement';
import {expect} from 'chai';

describe('isHTMLElement',()=>{
	
	const div = document.createElement('div');
	
	it('should return true if the object is an HTMLElement',()=>{
		expect(isHTMLElement(div)).to.equal(true);
	});
});