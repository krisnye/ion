/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class ReturnStatement implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly value: Expression.Expression;
    static readonly id = 'ReturnStatement';
    static readonly implements = new Set([
        'ReturnStatement',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({location = null, value}: {
        location?: Location.Location | Null.Null,
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        value?: Expression.Expression
    }) {
        return new ReturnStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ReturnStatement {
        return isReturnStatement(value);
    }
}
export function isReturnStatement(value): value is ReturnStatement {
    return Class.isInstance(ReturnStatement, value);
}
export default ReturnStatement;