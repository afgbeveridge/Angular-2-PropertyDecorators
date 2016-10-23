import { DelegatedPropertyAction } from './delegatedPropertyAction.interface';
import { AccessorOptions } from './accessorOptions.interface';
import { LocalStorageDelegatedPropertyAction } from './localStorageAction.class';
import { AccessHandler } from './decorator.common';

export function LocalStorage(optionsOrPrefix: string | AccessorOptions) {
    function ensureConfigured(opts: AccessorOptions): AccessorOptions {
        opts.factory =
            opts.factory ||
            ((p, c) => new LocalStorageDelegatedPropertyAction(p, c));
        return opts;
    }
    return AccessHandler(
        ensureConfigured(
            typeof optionsOrPrefix === "string" ?
            <AccessorOptions>{
                storagePrefix: optionsOrPrefix,
                createToJsonOverride: true
                }
                : optionsOrPrefix
        ));
}


