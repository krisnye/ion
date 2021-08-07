/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Node implements _Object.Object {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    static readonly id = 'Node';
    static readonly implements = new Set([
        'Node',
        'ion_Object'
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
        return new Node({
            ...this,
            ...properties
        });
    }
    static is(value): value is Node {
        return isNode(value);
    }
}
export function isNode(value): value is Node {
    return Class.isInstance(Node, value);
}
export default Node;