import { BaseDelegatedPropertyAction } from './baseDelegatedAction.class';

export class SessionStorageDelegatedPropertyAction extends BaseDelegatedPropertyAction {

    constructor(propertyKey: string, canonicalKey: string) {
        super(propertyKey, canonicalKey);
        this.val = JSON.parse(this.read());
    }

    set(newValue: any) {
        this.write(JSON.stringify(newValue));
        super.set(newValue);
    }

    preConditionsSatisfied(): boolean {
        return window.sessionStorage && true;
    }

    private read() {
        return sessionStorage.getItem(this.storageKey) || null;
    }

    private write(val: any) {
        sessionStorage.setItem(this.storageKey, val);
    }
}