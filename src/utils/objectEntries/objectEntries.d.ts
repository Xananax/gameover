interface CustomIterable {
	[Symbol.iterator]() : CustomIterator;
}
interface CustomIterator {
	next() : CustomIteratorResult;
}

interface CustomIteratableIterator extends CustomIterable, CustomIterator{}

interface CustomIteratorResult {
	value: any;
	done: boolean;
}