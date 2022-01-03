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
export class YieldExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly argument: Expression.Expression;
    readonly delegate: Boolean.Boolean;
    static readonly id = 'YieldExpression';
    static readonly implements = new Set([
        'YieldExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, argument, delegate = false}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        argument: Expression.Expression,
        delegate?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        if (!Boolean.isBoolean(delegate))
            throw new Error('delegate is not a Boolean: ' + Class.toString(delegate));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.argument = argument;
        this.delegate = delegate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
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