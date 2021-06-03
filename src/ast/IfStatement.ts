/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as BlockStatement from './BlockStatement';
import * as Class from './ion/Class';
export class IfStatement implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly test: Expression.Expression;
    readonly consequent: BlockStatement.BlockStatement;
    readonly alternate: BlockStatement.BlockStatement | (IfStatement | Null.Null);
    static readonly id = 'IfStatement';
    static readonly implements = new Set([
        'IfStatement',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({location = null, test, consequent, alternate = null}: {
        location?: Location.Location | Null.Null,
        test: Expression.Expression,
        consequent: BlockStatement.BlockStatement,
        alternate?: BlockStatement.BlockStatement | (IfStatement | Null.Null)
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Expression.isExpression(test))
            throw new Error('test is not a Expression: ' + Class.toString(test));
        if (!BlockStatement.isBlockStatement(consequent))
            throw new Error('consequent is not a BlockStatement: ' + Class.toString(consequent));
        if (!(BlockStatement.isBlockStatement(alternate) || (isIfStatement(alternate) || Null.isNull(alternate))))
            throw new Error('alternate is not a BlockStatement | IfStatement | Null: ' + Class.toString(alternate));
        this.location = location;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        test?: Expression.Expression,
        consequent?: BlockStatement.BlockStatement,
        alternate?: BlockStatement.BlockStatement | (IfStatement | Null.Null)
    }) {
        return new IfStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is IfStatement {
        return isIfStatement(value);
    }
}
export function isIfStatement(value): value is IfStatement {
    return Class.isInstance(IfStatement, value);
}
export default IfStatement;