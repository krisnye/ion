/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ChainElement implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly optional: Boolean.Boolean;
    static readonly id = 'ChainElement';
    static readonly implements = new Set([
        'ChainElement',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, optional = false}: {
        location?: Location.Location | Null.Null,
        optional?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Boolean.isBoolean(optional))
            throw new Error('optional is not a Boolean: ' + Class.toString(optional));
        this.location = location;
        this.optional = optional;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        optional?: Boolean.Boolean
    }) {
        return new ChainElement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ChainElement {
        return isChainElement(value);
    }
}
export function isChainElement(value): value is ChainElement {
    return Class.isInstance(ChainElement, value);
}
export default ChainElement;