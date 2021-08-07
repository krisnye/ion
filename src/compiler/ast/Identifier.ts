/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Identifier implements _Object.Object , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly path: String.String | Null.Null;
    static readonly id = 'Identifier';
    static readonly implements = new Set([
        'Identifier',
        'ion_Object',
        'Node'
    ]);
    constructor({$ = 0, location = null, name, path = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        name: String.String,
        path?: String.String | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(path) || Null.isNull(path)))
            throw new Error('path is not a String | Null: ' + Class.toString(path));
        this.$ = $;
        this.location = location;
        this.name = name;
        this.path = path;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        name?: String.String,
        path?: String.String | Null.Null
    }) {
        return new Identifier({
            ...this,
            ...properties
        });
    }
    static is(value): value is Identifier {
        return isIdentifier(value);
    }
}
export function isIdentifier(value): value is Identifier {
    return Class.isInstance(Identifier, value);
}
export default Identifier;