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
import * as BlockStatement from './BlockStatement';
import * as CatchClause from './CatchClause';
import * as Class from './ion/Class';
export class TryStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly block: BlockStatement.BlockStatement;
    readonly handler: CatchClause.CatchClause | Null.Null;
    readonly finalizer: BlockStatement.BlockStatement | Null.Null;
    static readonly id = 'TryStatement';
    static readonly implements = new Set([
        'TryStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, block, handler = null, finalizer = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        block: BlockStatement.BlockStatement,
        handler?: CatchClause.CatchClause | Null.Null,
        finalizer?: BlockStatement.BlockStatement | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!BlockStatement.isBlockStatement(block))
            throw new Error('block is not a BlockStatement: ' + Class.toString(block));
        if (!(CatchClause.isCatchClause(handler) || Null.isNull(handler)))
            throw new Error('handler is not a CatchClause | Null: ' + Class.toString(handler));
        if (!(BlockStatement.isBlockStatement(finalizer) || Null.isNull(finalizer)))
            throw new Error('finalizer is not a BlockStatement | Null: ' + Class.toString(finalizer));
        this.location = location;
        this.type = type;
        this.block = block;
        this.handler = handler;
        this.finalizer = finalizer;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        block?: BlockStatement.BlockStatement,
        handler?: CatchClause.CatchClause | Null.Null,
        finalizer?: BlockStatement.BlockStatement | Null.Null
    }) {
        return new TryStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is TryStatement {
        return isTryStatement(value);
    }
}
export function isTryStatement(value): value is TryStatement {
    return Class.isInstance(TryStatement, value);
}
export default TryStatement;