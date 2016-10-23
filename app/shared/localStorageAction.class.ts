import { BaseDelegatedPropertyAction } from './baseDelegatedAction.class';

export class LocalStorageDelegatedPropertyAction extends BaseDelegatedPropertyAction {

    constructor(propertyKey: string, canonicalKey: string) {
        super(propertyKey, canonicalKey);
        this.val = JSON.parse(this.read());
    }

    set(newValue: any) {
        this.write(JSON.stringify(newValue));
        super.set(newValue);
    }

    preConditionsSatisfied(): boolean {
        return window.localStorage && true;
    }

    private read() {
        return localStorage.getItem(this.storageKey) || null;
    }

    private write(val: any) {
        localStorage.setItem(this.storageKey, val);
    }
}