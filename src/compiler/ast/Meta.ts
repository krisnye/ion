/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Class from './ion/Class';
export class Meta implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly meta: _Array.Array<Property.Property> | Null.Null;
    static readonly id = 'Meta';
    static readonly implements = new Set([
        'Meta',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, meta = null}: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(_Array.isArray(meta) || Null.isNull(meta)))
            throw new Error('meta is not a Array | Null: ' + Class.toString(meta));
        this.location = location;
        this.meta = meta;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        meta?: _Array.Array<Property.Property> | Null.Null
    }) {
        return new Meta({
            ...this,
            ...properties
        });
    }
    static is(value): value is Meta {
        return isMeta(value);
    }
}
export function isMeta(value): value is Meta {
    return Class.isInstance(Meta, value);
}
export default Meta;