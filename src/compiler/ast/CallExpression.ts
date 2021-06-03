/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as ChainElement from './ChainElement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Statement from './Statement';
import * as SpreadElement from './SpreadElement';
import * as Class from './ion/Class';
export class CallExpression implements _Object.Object , Expression.Expression , ChainElement.ChainElement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly optional: Boolean.Boolean;
    readonly new: Boolean.Boolean;
    readonly callee: Expression.Expression;
    readonly arguments: _Array.Array<Expression.Expression | (Statement.Statement | SpreadElement.SpreadElement)>;
    static readonly id = 'CallExpression';
    static readonly implements = new Set([
        'CallExpression',
        'ion_Object',
        'Expression',
        'ChainElement',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        optional = false,
        new: _new = false,
        callee,
        arguments: _arguments
    }: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        optional?: Boolean.Boolean,
        new?: Boolean.Boolean,
        callee: Expression.Expression,
        arguments: _Array.Array<Expression.Expression | (Statement.Statement | SpreadElement.SpreadElement)>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(optional))
            throw new Error('optional is not a Boolean: ' + Class.toString(optional));
        if (!Boolean.isBoolean(_new))
            throw new Error('new is not a Boolean: ' + Class.toString(_new));
        if (!Expression.isExpression(callee))
            throw new Error('callee is not a Expression: ' + Class.toString(callee));
        if (!_Array.isArray(_arguments))
            throw new Error('arguments is not a Array: ' + Class.toString(_arguments));
        this.location = location;
        this.type = type;
        this.optional = optional;
        this.new = _new;
        this.callee = callee;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        optional?: Boolean.Boolean,
        new?: Boolean.Boolean,
        callee?: Expression.Expression,
        arguments?: _Array.Array<Expression.Expression | (Statement.Statement | SpreadElement.SpreadElement)>
    }) {
        return new CallExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is CallExpression {
        return isCallExpression(value);
    }
}
export function isCallExpression(value): value is CallExpression {
    return Class.isInstance(CallExpression, value);
}
export default CallExpression;