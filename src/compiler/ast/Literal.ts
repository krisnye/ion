/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as RuntimeType from './RuntimeType';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Type from './Type';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Number from './ion/Number';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Literal implements _Object.Object , Expression.Expression , RuntimeType.RuntimeType , Typed.Typed , Node.Node , Type.Type {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly value: String.String | (Number.Number | (Boolean.Boolean | Null.Null));
    static readonly id = 'Literal';
    static readonly implements = new Set([
        'Literal',
        'ion_Object',
        'Expression',
        'RuntimeType',
        'Typed',
        'Node',
        'Type'
    ]);
    constructor({location = null, type = null, value}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        value: String.String | (Number.Number | (Boolean.Boolean | Null.Null))
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(String.isString(value) || (Number.isNumber(value) || (Boolean.isBoolean(value) || Null.isNull(value)))))
            throw new Error('value is not a String | Number | Boolean | Null: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        value?: String.String | (Number.Number | (Boolean.Boolean | Null.Null))
    }) {
        return new Literal({
            ...this,
            ...properties
        });
    }
    static is(value): value is Literal {
        return isLiteral(value);
    }
}
export function isLiteral(value): value is Literal {
    return Class.isInstance(Literal, value);
}
export default Literal;