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
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Variable from './Variable';
import * as Class from './ion/Class';
export class ArrowFunctionExpression implements _Object.Object , Expression.Expression , Scope.Scope , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly params: _Array.Array<Variable.Variable>;
    readonly body: Expression.Expression;
    static readonly id = 'ArrowFunctionExpression';
    static readonly implements = new Set([
        'ArrowFunctionExpression',
        'ion_Object',
        'Expression',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, params, body}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        params: _Array.Array<Variable.Variable>,
        body: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(params))
            throw new Error('params is not a Array: ' + Class.toString(params));
        if (!Expression.isExpression(body))
            throw new Error('body is not a Expression: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.params = params;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        params?: _Array.Array<Variable.Variable>,
        body?: Expression.Expression
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