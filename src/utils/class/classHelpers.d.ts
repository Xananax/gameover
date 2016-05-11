interface OneArgLeft<A,B>{
	(node:A):B;
}

interface SelectElementForClassOperation extends OneArgLeft<HTMLElement,OperateWithElement>{}

interface SelectElementForCheck extends OneArgLeft<HTMLElement,CheckIfElement>{}

interface OperateWithElement{
	():HTMLElement
}

interface CheckIfElement{
	():HTMLElement
}