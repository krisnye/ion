/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as String from './ion/String';
import * as NumberType from './NumberType';
import * as Class from './ion/Class';
export class StringType implements _Object.Object , Type.Type , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly value: String.String | Null.Null;
    readonly length: NumberType.NumberType;
    static readonly id = 'StringType';
    static readonly implements = new Set([
        'StringType',
        'ion_Object',
        'Type',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, value = null, length}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        value?: String.String | Null.Null,
        length: NumberType.NumberType
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(String.isString(value) || Null.isNull(value)))
            throw new Error('value is not a String | Null: ' + Class.toString(value));
        if (!NumberType.isNumberType(length))
            throw new Error('length is not a NumberType: ' + Class.toString(length));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.value = value;
        this.length = length;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        value?: String.String | Null.Null,
        length?: NumberType.NumberType
    }) {
        return new StringType({
            ...this,
            ...properties
        });
    }
    static is(value): value is StringType {
        return isStringType(value);
    }
}
export function isStringType(value): value is StringType {
    return Class.isInstance(StringType, value);
}
export default StringType;