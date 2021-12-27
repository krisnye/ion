/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Identifier from './Identifier';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class Reference implements _Object.Object , Identifier.Identifier , Expression.Expression , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly typeArguments: _Array.Array<Expression.Expression> | Null.Null;
    static readonly id = 'Reference';
    static readonly implements = new Set([
        'Reference',
        'ion_Object',
        'Identifier',
        'Expression',
        'Node',
        'Typed'
    ]);
    constructor({location = null, name, type = null, resolved = false, typeArguments = null}: {
        location?: Location.Location | Null.Null,
        name: String.String,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        typeArguments?: _Array.Array<Expression.Expression> | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(_Array.isArray(typeArguments) || Null.isNull(typeArguments)))
            throw new Error('typeArguments is not a Array | Null: ' + Class.toString(typeArguments));
        this.location = location;
        this.name = name;
        this.type = type;
        this.resolved = resolved;
        this.typeArguments = typeArguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
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