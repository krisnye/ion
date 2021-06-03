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
export class ReturnStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly argument: Expression.Expression | Null.Null;
    static readonly id = 'ReturnStatement';
    static readonly implements = new Set([
        'ReturnStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, argument = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(argument) || Null.isNull(argument)))
            throw new Error('argument is not a Expression | Null: ' + Class.toString(argument));
        this.location = location;
        this.type = type;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        argument?: Expression.Expression | Null.Null
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