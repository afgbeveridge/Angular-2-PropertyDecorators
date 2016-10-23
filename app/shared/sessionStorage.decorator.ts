import { DelegatedPropertyAction } from './delegatedPropertyAction.interface';
import { AccessorOptions } from './accessorOptions.interface';
import { SessionStorageDelegatedPropertyAction } from './sessionStorageAction.class';
import { AccessHandler } from './decorator.common';

export function SessionStorage(optionsOrPrefix: string | AccessorOptions) {
    function ensureConfigured(opts: AccessorOptions): AccessorOptions {
        opts.factory =
            opts.factory ||
            ((p, c) => new SessionStorageDelegatedPropertyAction(p, c));
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


