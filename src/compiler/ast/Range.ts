/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Range implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly start: Expression.Expression;
    readonly end: Expression.Expression;
    readonly inclusive: Boolean.Boolean;
    readonly step: Expression.Expression | Null.Null;
    static readonly id = 'Range';
    static readonly implements = new Set([
        'Range',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, start, end, inclusive, step = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        start: Expression.Expression,
        end: Expression.Expression,
        inclusive: Boolean.Boolean,
        step?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Expression.isExpression(start))
            throw new Error('start is not a Expression: ' + Class.toString(start));
        if (!Expression.isExpression(end))
            throw new Error('end is not a Expression: ' + Class.toString(end));
        if (!Boolean.isBoolean(inclusive))
            throw new Error('inclusive is not a Boolean: ' + Class.toString(inclusive));
        if (!(Expression.isExpression(step) || Null.isNull(step)))
            throw new Error('step is not a Expression | Null: ' + Class.toString(step));
        this.location = location;
        this.type = type;
        this.start = start;
        this.end = end;
        this.inclusive = inclusive;
        this.step = step;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        start?: Expression.Expression,
        end?: Expression.Expression,
        inclusive?: Boolean.Boolean,
        step?: Expression.Expression | Null.Null
    }) {
        return new Range({
            ...this,
            ...properties
        });
    }
    static is(value): value is Range {
        return isRange(value);
    }
}
export function isRange(value): value is Range {
    return Class.isInstance(Range, value);
}
export default Range;