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
export class ForOfStatement implements _Object.Object , LoopStatement.LoopStatement , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly left: VariableDeclaration.VariableDeclaration;
    readonly count: VariableDeclaration.VariableDeclaration | Null.Null;
    readonly right: Expression.Expression;
    readonly body: BlockStatement.BlockStatement;
    static readonly id = 'ForOfStatement';
    static readonly implements = new Set([
        'ForOfStatement',
        'ion_Object',
        'LoopStatement',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, left, count = null, right, body}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        left: VariableDeclaration.VariableDeclaration,
        count?: VariableDeclaration.VariableDeclaration | Null.Null,
        right: Expression.Expression,
        body: BlockStatement.BlockStatement
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!VariableDeclaration.isVariableDeclaration(left))
            throw new Error('left is not a VariableDeclaration: ' + Class.toString(left));
        if (!(VariableDeclaration.isVariableDeclaration(count) || Null.isNull(count)))
            throw new Error('count is not a VariableDeclaration | Null: ' + Class.toString(count));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        if (!BlockStatement.isBlockStatement(body))
            throw new Error('body is not a BlockStatement: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.left = left;
        this.count = count;
        this.right = right;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        left?: VariableDeclaration.VariableDeclaration,
        count?: VariableDeclaration.VariableDeclaration | Null.Null,
        right?: Expression.Expression,
        body?: BlockStatement.BlockStatement
    }) {
        return new ForOfStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ForOfStatement {
        return isForOfStatement(value);
    }
}
export function isForOfStatement(value): value is ForOfStatement {
    return Class.isInstance(ForOfStatement, value);
}
export default ForOfStatement;