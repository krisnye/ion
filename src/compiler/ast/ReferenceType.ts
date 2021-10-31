/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Reference from './Reference';
import * as Type from './Type';
import * as Identifier from './Identifier';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class ReferenceType implements _Object.Object , Reference.Reference , Type.Type , Identifier.Identifier , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly path: String.String | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly arguments: _Array.Array<Expression.Expression> | Null.Null;
    static readonly id = 'ReferenceType';
    static readonly implements = new Set([
        'ReferenceType',
        'ion_Object',
        'Reference',
        'Type',
        'Identifier',
        'Expression',
        'Node'
    ]);
    constructor({
        location = null,
        name,
        path = null,
        type = null,
        arguments: _arguments = null
    }: {
        location?: Location.Location | Null.Null,
        name: String.String,
        path?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        arguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(path) || Null.isNull(path)))
            throw new Error('path is not a String | Null: ' + Class.toString(path));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(_Array.isArray(_arguments) || Null.isNull(_arguments)))
            throw new Error('arguments is not a Array | Null: ' + Class.toString(_arguments));
        this.location = location;
        this.name = name;
        this.path = path;
        this.type = type;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        path?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        arguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        return new ReferenceType({
            ...this,
            ...properties
        });
    }
    static is(value): value is ReferenceType {
        return isReferenceType(value);
    }
}
export function isReferenceType(value): value is ReferenceType {
    return Class.isInstance(ReferenceType, value);
}
export default ReferenceType;