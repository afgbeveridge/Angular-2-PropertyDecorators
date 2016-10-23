import { DelegatedPropertyAction } from './delegatedPropertyAction.interface';
import { AccessorOptions } from './accessorOptions.interface';

export function PropertyInterceptor(options: AccessorOptions) {
    return AccessHandler(options);
}

export function AccessHandler(options: AccessorOptions) {
    return (target: Object, key?: string): void => {

        function makeKey(key: string) : string {
            return (options.storagePrefix || '') + '/' + key;
        }

        let privateName = '$__' + key, storeKey = makeKey(key);
        let handler = options.factory(key, storeKey);

        if (handler.preConditionsSatisfied()) {

            target[privateName] = handler;

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

            let notedKey = target[privateName].constructor.name + '_notedKeys', jsonOverride = 'toJSON';

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
