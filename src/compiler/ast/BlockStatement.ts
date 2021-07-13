/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Block from './Block';
import * as Statement from './Statement';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class BlockStatement implements _Object.Object , Block.Block , Statement.Statement , Scope.Scope , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly body: _Array.Array<Statement.Statement>;
    readonly type: Expression.Expression | Null.Null;
    static readonly id = 'BlockStatement';
    static readonly implements = new Set([
        'BlockStatement',
        'ion_Object',
        'Block',
        'Statement',
        'Scope',
        'Node',
        'Typed'
    ]);
    constructor({location = null, body, type = null}: {
        location?: Location.Location | Null.Null,
        body: _Array.Array<Statement.Statement>,
        type?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!_Array.isArray(body))
            throw new Error('body is not a Array: ' + Class.toString(body));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        this.location = location;
        this.body = body;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        body?: _Array.Array<Statement.Statement>,
        type?: Expression.Expression | Null.Null
    }) {
        return new BlockStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is BlockStatement {
        return isBlockStatement(value);
    }
}
export function isBlockStatement(value): value is BlockStatement {
    return Class.isInstance(BlockStatement, value);
}
export default BlockStatement;