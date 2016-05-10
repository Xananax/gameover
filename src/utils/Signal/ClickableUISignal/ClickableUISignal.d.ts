interface HTMLElementsHash{
	[keyName:string]:HTMLElement[];
}

interface NodesSignal{
	[type:string]:Signal<any,any>;
}

interface CLickableUISignal<OUT> extends CombinedSignal<OUT>{}