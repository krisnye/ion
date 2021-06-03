/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as LoopStatement from './LoopStatement';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as VariableDeclaration from './VariableDeclaration';
import * as Expression from './Expression';
import * as BlockStatement from './BlockStatement';
import * as Class from './ion/Class';
export class ForStatement implements _Object.Object , LoopStatement.LoopStatement , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly init: VariableDeclaration.VariableDeclaration | Null.Null;
    readonly test: Expression.Expression | Null.Null;
    readonly update: Expression.Expression | Null.Null;
    readonly body: BlockStatement.BlockStatement;
    static readonly id = 'ForStatement';
    static readonly implements = new Set([
        'ForStatement',
        'ion_Object',
        'LoopStatement',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, init = null, test = null, update = null, body}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        init?: VariableDeclaration.VariableDeclaration | Null.Null,
        test?: Expression.Expression | Null.Null,
        update?: Expression.Expression | Null.Null,
        body: BlockStatement.BlockStatement
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(VariableDeclaration.isVariableDeclaration(init) || Null.isNull(init)))
            throw new Error('init is not a VariableDeclaration | Null: ' + Class.toString(init));
        if (!(Expression.isExpression(test) || Null.isNull(test)))
            throw new Error('test is not a Expression | Null: ' + Class.toString(test));
        if (!(Expression.isExpression(update) || Null.isNull(update)))
            throw new Error('update is not a Expression | Null: ' + Class.toString(update));
        if (!BlockStatement.isBlockStatement(body))
            throw new Error('body is not a BlockStatement: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        init?: VariableDeclaration.VariableDeclaration | Null.Null,
        test?: Expression.Expression | Null.Null,
        update?: Expression.Expression | Null.Null,
        body?: BlockStatement.BlockStatement
    }) {
        return new ForStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ForStatement {
        return isForStatement(value);
    }
}
export function isForStatement(value): value is ForStatement {
    return Class.isInstance(ForStatement, value);
}
export default ForStatement;