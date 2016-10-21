
export interface DelegatedPropertyAction {
    propertyKey: string;
    storageKey: string;
    get(): any;
    set(newValue: any): any;
}

export interface AccessorOptions {
    storagePrefix?: string;
    factory?(propertyKey: string, storageKey: string): DelegatedPropertyAction;
    preconditionsAssessor?(): boolean;
    createToJsonOverride?: boolean;
}

export function LocalStorage(optionsOrPrefix: string | AccessorOptions) {
    function ensureConfigured(opts: AccessorOptions): AccessorOptions {
        opts.preconditionsAssessor =
            opts.preconditionsAssessor ||
            (() => window.localStorage && true);
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

export function PropertyInterceptor(options: AccessorOptions) {
    return AccessHandler(options);
}

function AccessHandler(options: AccessorOptions) {
    return (target: Object, key?: string): void => {

        function makeKey(key: string) {
            return (options.storagePrefix || '') + '/' + key;
        }

        if (!options.preconditionsAssessor || options.preconditionsAssessor()) {

            let privateName = '$__' + key, storeKey = makeKey(key);

            target[privateName] = options.factory(key, storeKey);

            Object.defineProperty(target, key, {
                get: function () {
                    return (<DelegatedPropertyAction>this[privateName]).get();
                },
                set: function (newVal: any) {
                    (<DelegatedPropertyAction>this[privateName]).set(newVal);
                },
                enumerable: true,
                configurable: true
            });

            const notedKey = '_notedKeys', jsonOverride = 'toJSON';

            target[notedKey] = target[notedKey] || [];
            target[notedKey].push(key);

            options.factory(notedKey, makeKey(notedKey)).set(target[notedKey]);

            if (options.createToJsonOverride && !target.hasOwnProperty(jsonOverride)) {
                target[jsonOverride] = function () {
                    let knownKeys = Array<string>(target[notedKey]);
                    let result = { _notedKeys: knownKeys };
                    knownKeys.forEach(x => result[x] = target[x]);
                    return result;
                };
            }
        }
    }
}


export class LocalStorageDelegatedPropertyAction implements DelegatedPropertyAction {

    storageKey: string;
    propertyKey: string;
    private val: any;

    constructor(propertyKey: string, canonicalKey: string) {
        this.propertyKey = propertyKey;
        this.storageKey = canonicalKey;
        this.val = JSON.parse(this.read());
    }

    get(): any {
        return this.val;
    }

    set(newValue: any) {
        this.write(JSON.stringify(newValue));
        this.val = newValue;
    }

    private read() {
        return localStorage.getItem(this.storageKey) || null;
    }

    private write(val: any) {
        localStorage.setItem(this.storageKey, val);
    }
}