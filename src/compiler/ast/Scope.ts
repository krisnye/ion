/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Scope implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    static readonly id = 'Scope';
    static readonly implements = new Set([
        'Scope',
        'ion_Object',
        'Node'
    ]);
    constructor({
        location = null
    }: { location?: Location.Location | Null.Null }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        this.location = location;
        Object.freeze(this);
    }
    patch(properties: { location?: Location.Location | Null.Null }) {
        return new Scope({
            ...this,
            ...properties
        });
    }
    static is(value): value is Scope {
        return isScope(value);
    }
}
export function isScope(value): value is Scope {
    return Class.isInstance(Scope, value);
}
export default Scope;