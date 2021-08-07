/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Range implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
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
    constructor({$ = 0, location = null, type = null, start, end, inclusive, step = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        start: Expression.Expression,
        end: Expression.Expression,
        inclusive: Boolean.Boolean,
        step?: Expression.Expression | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(start))
            throw new Error('start is not a Expression: ' + Class.toString(start));
        if (!Expression.isExpression(end))
            throw new Error('end is not a Expression: ' + Class.toString(end));
        if (!Boolean.isBoolean(inclusive))
            throw new Error('inclusive is not a Boolean: ' + Class.toString(inclusive));
        if (!(Expression.isExpression(step) || Null.isNull(step)))
            throw new Error('step is not a Expression | Null: ' + Class.toString(step));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.start = start;
        this.end = end;
        this.inclusive = inclusive;
        this.step = step;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
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