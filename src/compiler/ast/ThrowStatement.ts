/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class ThrowStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly argument: Expression.Expression;
    static readonly id = 'ThrowStatement';
    static readonly implements = new Set([
        'ThrowStatement',
        'ion_Object',
        'Statement',
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
        return new ThrowStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ThrowStatement {
        return isThrowStatement(value);
    }
}
export function isThrowStatement(value): value is ThrowStatement {
    return Class.isInstance(ThrowStatement, value);
}
export default ThrowStatement;