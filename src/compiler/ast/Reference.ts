/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Identifier from './Identifier';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class Reference implements _Object.Object , Identifier.Identifier , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly absolute: String.String | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly arguments: _Array.Array<Expression.Expression> | Null.Null;
    static readonly id = 'Reference';
    static readonly implements = new Set([
        'Reference',
        'ion_Object',
        'Identifier',
        'Expression',
        'Node'
    ]);
    constructor({
        location = null,
        name,
        absolute = null,
        type = null,
        arguments: _arguments = null
    }: {
        location?: Location.Location | Null.Null,
        name: String.String,
        absolute?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        arguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(absolute) || Null.isNull(absolute)))
            throw new Error('absolute is not a String | Null: ' + Class.toString(absolute));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(_Array.isArray(_arguments) || Null.isNull(_arguments)))
            throw new Error('arguments is not a Array | Null: ' + Class.toString(_arguments));
        this.location = location;
        this.name = name;
        this.absolute = absolute;
        this.type = type;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        absolute?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        arguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        return new Reference({
            ...this,
            ...properties
        });
    }
    static is(value): value is Reference {
        return isReference(value);
    }
}
export function isReference(value): value is Reference {
    return Class.isInstance(Reference, value);
}
export default Reference;