import { DelegatedPropertyAction } from './delegatedPropertyAction.interface';

export interface AccessorOptions {
    storagePrefix?: string;
    factory?(propertyKey: string, storageKey: string): DelegatedPropertyAction;
    createToJsonOverride?: boolean;
}