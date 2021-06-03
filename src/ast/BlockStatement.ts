/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class BlockStatement implements _Object.Object , Statement.Statement , Scope.Scope , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly statements: _Array.Array<Statement.Statement>;
    static readonly id = 'BlockStatement';
    static readonly implements = new Set([
        'BlockStatement',
        'ion_Object',
        'Statement',
        'Scope',
        'Node'
    ]);
    constructor({location = null, statements}: {
        location?: Location.Location | Null.Null,
        statements: _Array.Array<Statement.Statement>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!_Array.isArray(statements))
            throw new Error('statements is not a Array: ' + Class.toString(statements));
        this.location = location;
        this.statements = statements;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        statements?: _Array.Array<Statement.Statement>
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