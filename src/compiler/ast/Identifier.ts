/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class Identifier implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly absolute: String.String | Null.Null;
    static readonly id = 'Identifier';
    static readonly implements = new Set([
        'Identifier',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, name, absolute = null}: {
        location?: Location.Location | Null.Null,
        name: String.String,
        absolute?: String.String | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(absolute) || Null.isNull(absolute)))
            throw new Error('absolute is not a String | Null: ' + Class.toString(absolute));
        this.location = location;
        this.name = name;
        this.absolute = absolute;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        absolute?: String.String | Null.Null
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