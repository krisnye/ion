/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Class from './ion/Class';
export class Typed implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    static readonly id = 'Typed';
    static readonly implements = new Set([
        'Typed',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, type = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null
    }) {
        return new Typed({
            ...this,
            ...properties
        });
    }
    static is(value): value is Typed {
        return isTyped(value);
    }
}
export function isTyped(value): value is Typed {
    return Class.isInstance(Typed, value);
}
export default Typed;