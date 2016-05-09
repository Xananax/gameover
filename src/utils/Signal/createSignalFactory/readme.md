# createSignalFactory

creates a factory that augments created signals with any passed mixin.

```js
import {MergedSignal, CounterSignal} from 'signal'
const Factory = createSignalFactory([MergedSignal,CounterSignal]);
const signal = Factory();
// signal is now a MergedSignal and a CounterSignal, on top of being a regular signal.
```