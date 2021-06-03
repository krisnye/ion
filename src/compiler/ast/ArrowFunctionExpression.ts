/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as _Array from './ion/Array';
import * as Parameter from './Parameter';
import * as BlockStatement from './BlockStatement';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ArrowFunctionExpression implements _Object.Object , Expression.Expression , Scope.Scope , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly params: _Array.Array<Parameter.Parameter>;
    readonly body: BlockStatement.BlockStatement | Expression.Expression;
    readonly expression: Boolean.Boolean;
    static readonly id = 'ArrowFunctionExpression';
    static readonly implements = new Set([
        'ArrowFunctionExpression',
        'ion_Object',
        'Expression',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, params, body, expression}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        params: _Array.Array<Parameter.Parameter>,
        body: BlockStatement.BlockStatement | Expression.Expression,
        expression: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!_Array.isArray(params))
            throw new Error('params is not a Array: ' + Class.toString(params));
        if (!(BlockStatement.isBlockStatement(body) || Expression.isExpression(body)))
            throw new Error('body is not a BlockStatement | Expression: ' + Class.toString(body));
        if (!Boolean.isBoolean(expression))
            throw new Error('expression is not a Boolean: ' + Class.toString(expression));
        this.location = location;
        this.type = type;
        this.params = params;
        this.body = body;
        this.expression = expression;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        params?: _Array.Array<Parameter.Parameter>,
        body?: BlockStatement.BlockStatement | Expression.Expression,
        expression?: Boolean.Boolean
    }) {
        return new ArrowFunctionExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is ArrowFunctionExpression {
        return isArrowFunctionExpression(value);
    }
}
export function isArrowFunctionExpression(value): value is ArrowFunctionExpression {
    return Class.isInstance(ArrowFunctionExpression, value);
}
export default ArrowFunctionExpression;