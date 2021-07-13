/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as SpreadElement from './SpreadElement';
import * as Class from './ion/Class';
export class ExpressionStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly expression: Expression.Expression | SpreadElement.SpreadElement;
    static readonly id = 'ExpressionStatement';
    static readonly implements = new Set([
        'ExpressionStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, expression}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        expression: Expression.Expression | SpreadElement.SpreadElement
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(expression) || SpreadElement.isSpreadElement(expression)))
            throw new Error('expression is not a Expression | SpreadElement: ' + Class.toString(expression));
        this.location = location;
        this.type = type;
        this.expression = expression;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        expression?: Expression.Expression | SpreadElement.SpreadElement
    }) {
        return new ExpressionStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is ExpressionStatement {
        return isExpressionStatement(value);
    }
}
export function isExpressionStatement(value): value is ExpressionStatement {
    return Class.isInstance(ExpressionStatement, value);
}
export default ExpressionStatement;