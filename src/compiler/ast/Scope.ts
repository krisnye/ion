/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Scope implements _Object.Object , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    static readonly id = 'Scope';
    static readonly implements = new Set([
        'Scope',
        'ion_Object',
        'Node'
    ]);
    constructor({$ = 0, location = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        this.$ = $;
        this.location = location;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null
    }) {
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