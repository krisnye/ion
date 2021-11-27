/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class DebuggerStatement implements _Object.Object , Statement.Statement , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    static readonly id = 'DebuggerStatement';
    static readonly implements = new Set([
        'DebuggerStatement',
        'ion_Object',
        'Statement',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null
    }) {
        return new DebuggerStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is DebuggerStatement {
        return isDebuggerStatement(value);
    }
}
export function isDebuggerStatement(value): value is DebuggerStatement {
    return Class.isInstance(DebuggerStatement, value);
}
export default DebuggerStatement;