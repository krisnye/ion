/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Class from './ion/Class';
export class SideEffect implements _Object.Object {
    static readonly id = 'SideEffect';
    static readonly implements = new Set([
        'SideEffect',
        'ion_Object'
    ]);
    constructor({}: {}) {
        Object.freeze(this);
    }
    patch(properties: {}) {
        return new SideEffect({
            ...this,
            ...properties
        });
    }
    static is(value): value is SideEffect {
        return isSideEffect(value);
    }
}
export function isSideEffect(value): value is SideEffect {
    return Class.isInstance(SideEffect, value);
}
export default SideEffect;