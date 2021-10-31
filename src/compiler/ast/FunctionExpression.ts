/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as _Array from './ion/Array';
import * as Variable from './Variable';
import * as Type from './Type';
import * as Block from './Block';
import * as Class from './ion/Class';
export class FunctionExpression implements _Object.Object , Expression.Expression , Scope.Scope , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Identifier.Identifier | Null.Null;
    readonly parameters: _Array.Array<Variable.Variable>;
    readonly returnType: Type.Type | Null.Null;
    readonly body: Block.Block;
    static readonly id = 'FunctionExpression';
    static readonly implements = new Set([
        'FunctionExpression',
        'ion_Object',
        'Expression',
        'Scope',
        'Node'
    ]);
    constructor({location = null, type = null, id = null, parameters, returnType = null, body}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        parameters: _Array.Array<Variable.Variable>,
        returnType?: Type.Type | Null.Null,
        body: Block.Block
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Identifier.isIdentifier(id) || Null.isNull(id)))
            throw new Error('id is not a Identifier | Null: ' + Class.toString(id));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        if (!(Type.isType(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Type | Null: ' + Class.toString(returnType));
        if (!Block.isBlock(body))
            throw new Error('body is not a Block: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.id = id;
        this.parameters = parameters;
        this.returnType = returnType;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        parameters?: _Array.Array<Variable.Variable>,
        returnType?: Type.Type | Null.Null,
        body?: Block.Block
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