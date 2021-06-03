/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as Type from './Type';
import * as Class from './ion/Class';
export class Identifier implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly path: String.String | Null.Null;
    readonly arguments: _Array.Array<Type.Type> | Null.Null;
    static readonly id = 'Identifier';
    static readonly implements = new Set([
        'Identifier',
        'ion_Object',
        'Node'
    ]);
    constructor({
        location = null,
        name,
        path = null,
        arguments: _arguments = null
    }: {
        location?: Location.Location | Null.Null,
        name: String.String,
        path?: String.String | Null.Null,
        arguments?: _Array.Array<Type.Type> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(path) || Null.isNull(path)))
            throw new Error('path is not a String | Null: ' + Class.toString(path));
        if (!(_Array.isArray(_arguments) || Null.isNull(_arguments)))
            throw new Error('arguments is not a Array | Null: ' + Class.toString(_arguments));
        this.location = location;
        this.name = name;
        this.path = path;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        path?: String.String | Null.Null,
        arguments?: _Array.Array<Type.Type> | Null.Null
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