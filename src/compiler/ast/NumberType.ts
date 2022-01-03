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
import * as Number from './ion/Number';
import * as Class from './ion/Class';
export class NumberType implements _Object.Object , Type.Type , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly precision: Number.Number | Null.Null;
    readonly min: Expression.Expression | Null.Null;
    readonly max: Expression.Expression | Null.Null;
    readonly minExclusive: Boolean.Boolean;
    readonly maxExclusive: Boolean.Boolean;
    static readonly id = 'NumberType';
    static readonly implements = new Set([
        'NumberType',
        'ion_Object',
        'Type',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, precision = null, min = null, max = null, minExclusive = false, maxExclusive = false}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        precision?: Number.Number | Null.Null,
        min?: Expression.Expression | Null.Null,
        max?: Expression.Expression | Null.Null,
        minExclusive?: Boolean.Boolean,
        maxExclusive?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(Number.isNumber(precision) || Null.isNull(precision)))
            throw new Error('precision is not a Number | Null: ' + Class.toString(precision));
        if (!(Expression.isExpression(min) || Null.isNull(min)))
            throw new Error('min is not a Expression | Null: ' + Class.toString(min));
        if (!(Expression.isExpression(max) || Null.isNull(max)))
            throw new Error('max is not a Expression | Null: ' + Class.toString(max));
        if (!Boolean.isBoolean(minExclusive))
            throw new Error('minExclusive is not a Boolean: ' + Class.toString(minExclusive));
        if (!Boolean.isBoolean(maxExclusive))
            throw new Error('maxExclusive is not a Boolean: ' + Class.toString(maxExclusive));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.precision = precision;
        this.min = min;
        this.max = max;
        this.minExclusive = minExclusive;
        this.maxExclusive = maxExclusive;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        precision?: Number.Number | Null.Null,
        min?: Expression.Expression | Null.Null,
        max?: Expression.Expression | Null.Null,
        minExclusive?: Boolean.Boolean,
        maxExclusive?: Boolean.Boolean
    }) {
        return new NumberType({
            ...this,
            ...properties
        });
    }
    static is(value): value is NumberType {
        return isNumberType(value);
    }
}
export function isNumberType(value): value is NumberType {
    return Class.isInstance(NumberType, value);
}
export default NumberType;