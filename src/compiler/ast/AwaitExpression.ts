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
import * as Class from './ion/Class';
export class AwaitExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly argument: Expression.Expression;
    static readonly id = 'AwaitExpression';
    static readonly implements = new Set([
        'AwaitExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, argument}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        this.location = location;
        this.type = type;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument?: Expression.Expression
    }) {
        return new AwaitExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is AwaitExpression {
        return isAwaitExpression(value);
    }
}
export function isAwaitExpression(value): value is AwaitExpression {
    return Class.isInstance(AwaitExpression, value);
}
export default AwaitExpression;