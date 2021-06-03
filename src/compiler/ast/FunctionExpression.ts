/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Type from './Type';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Parameter from './Parameter';
import * as BlockStatement from './BlockStatement';
import * as Class from './ion/Class';
export class FunctionExpression implements _Object.Object , Expression.Expression , Scope.Scope , Type.Type , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly id: Identifier.Identifier | (Expression.Expression | Null.Null);
    readonly bind: Boolean.Boolean;
    readonly params: _Array.Array<Parameter.Parameter>;
    readonly body: BlockStatement.BlockStatement;
    readonly async: Boolean.Boolean;
    readonly generator: Boolean.Boolean;
    readonly returnType: Type.Type | Null.Null;
    static readonly id = 'FunctionExpression';
    static readonly implements = new Set([
        'FunctionExpression',
        'ion_Object',
        'Expression',
        'Scope',
        'Type',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        id = null,
        bind = false,
        params,
        body,
        async: _async = false,
        generator = false,
        returnType = null
    }: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        id?: Identifier.Identifier | (Expression.Expression | Null.Null),
        bind?: Boolean.Boolean,
        params: _Array.Array<Parameter.Parameter>,
        body: BlockStatement.BlockStatement,
        async?: Boolean.Boolean,
        generator?: Boolean.Boolean,
        returnType?: Type.Type | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!(Identifier.isIdentifier(id) || (Expression.isExpression(id) || Null.isNull(id))))
            throw new Error('id is not a Identifier | Expression | Null: ' + Class.toString(id));
        if (!Boolean.isBoolean(bind))
            throw new Error('bind is not a Boolean: ' + Class.toString(bind));
        if (!_Array.isArray(params))
            throw new Error('params is not a Array: ' + Class.toString(params));
        if (!BlockStatement.isBlockStatement(body))
            throw new Error('body is not a BlockStatement: ' + Class.toString(body));
        if (!Boolean.isBoolean(_async))
            throw new Error('async is not a Boolean: ' + Class.toString(_async));
        if (!Boolean.isBoolean(generator))
            throw new Error('generator is not a Boolean: ' + Class.toString(generator));
        if (!(Type.isType(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Type | Null: ' + Class.toString(returnType));
        this.location = location;
        this.type = type;
        this.id = id;
        this.bind = bind;
        this.params = params;
        this.body = body;
        this.async = _async;
        this.generator = generator;
        this.returnType = returnType;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        id?: Identifier.Identifier | (Expression.Expression | Null.Null),
        bind?: Boolean.Boolean,
        params?: _Array.Array<Parameter.Parameter>,
        body?: BlockStatement.BlockStatement,
        async?: Boolean.Boolean,
        generator?: Boolean.Boolean,
        returnType?: Type.Type | Null.Null
    }) {
        return new FunctionExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is FunctionExpression {
        return isFunctionExpression(value);
    }
}
export function isFunctionExpression(value): value is FunctionExpression {
    return Class.isInstance(FunctionExpression, value);
}
export default FunctionExpression;