/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class YieldExpression implements _Object.Object , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly argument: Expression.Expression;
    readonly delegate: Boolean.Boolean;
    static readonly id = 'YieldExpression';
    static readonly implements = new Set([
        'YieldExpression',
        'ion_Object',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, argument, delegate = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        argument: Expression.Expression,
        delegate?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        if (!Boolean.isBoolean(delegate))
            throw new Error('delegate is not a Boolean: ' + Class.toString(delegate));
        this.location = location;
        this.type = type;
        this.argument = argument;
        this.delegate = delegate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        argument?: Expression.Expression,
        delegate?: Boolean.Boolean
    }) {
        return new YieldExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is YieldExpression {
        return isYieldExpression(value);
    }
}
export function isYieldExpression(value): value is YieldExpression {
    return Class.isInstance(YieldExpression, value);
}
export default YieldExpression;