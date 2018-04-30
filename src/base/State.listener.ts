import { SerializableNode } from '@dlcs/tools';

import { BaseComponent } from './BaseComponent';
import { IAutoRegister } from './AutoRegister';

/**
 * State listener parameters
 */
export interface IStateListenerDefinition {
    /**
     * From state
     */
    from: string | RegExp;
    /**
     * To state
     */
    to: string | RegExp;
}

/**
 * State listener
 * @param input Parameters
 */
export function StateListener(input: IStateListenerDefinition) {
    return function (target: BaseComponent, propertyKey: string, descriptor: PropertyDescriptor) {
        Object.defineProperty(target,
            `${propertyKey}${SerializableNode.get<string>(BaseComponent.config, BaseComponent.configKeys.reflector.name)}`
        , {
            get: (): IAutoRegister => ({
                type: 'StateListener',
                params: [input.from, input.to]
            })
        });
    };
}
