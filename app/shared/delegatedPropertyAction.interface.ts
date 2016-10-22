
export interface DelegatedPropertyAction {
    propertyKey: string;
    storageKey: string;
    get(): any;
    set(newValue: any): any;
}
