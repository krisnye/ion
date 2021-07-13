/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Identifier from './Identifier';
import * as Expression from './Expression';
import * as Type from './Type';
import * as RuntimeType from './RuntimeType';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class Reference implements _Object.Object , Identifier.Identifier , Expression.Expression , Type.Type , RuntimeType.RuntimeType , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly path: String.String | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly typeArguments: _Array.Array<Expression.Expression> | Null.Null;
    static readonly id = 'Reference';
    static readonly implements = new Set([
        'Reference',
        'ion_Object',
        'Identifier',
        'Expression',
        'Type',
        'RuntimeType',
        'Node',
        'Typed'
    ]);
    constructor({location = null, name, path = null, type = null, typeArguments = null}: {
        location?: Location.Location | Null.Null,
        name: String.String,
        path?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        typeArguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(String.isString(path) || Null.isNull(path)))
            throw new Error('path is not a String | Null: ' + Class.toString(path));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(_Array.isArray(typeArguments) || Null.isNull(typeArguments)))
            throw new Error('typeArguments is not a Array | Null: ' + Class.toString(typeArguments));
        this.location = location;
        this.name = name;
        this.path = path;
        this.type = type;
        this.typeArguments = typeArguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        path?: String.String | Null.Null,
        type?: Expression.Expression | Null.Null,
        typeArguments?: _Array.Array<Expression.Expression> | Null.Null
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