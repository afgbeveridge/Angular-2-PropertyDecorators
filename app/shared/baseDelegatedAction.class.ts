import { DelegatedPropertyAction } from './delegatedPropertyAction.interface';

export class BaseDelegatedPropertyAction implements DelegatedPropertyAction {

    storageKey: string;
    propertyKey: string;
    protected val: any;

    constructor(propertyKey: string, canonicalKey: string) {
        this.propertyKey = propertyKey;
        this.storageKey = canonicalKey;
    }

    get(): any {
        return this.val;
    }

    set(newValue: any) {
        this.val = newValue;
    }

}