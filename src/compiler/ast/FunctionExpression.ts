/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Scope from './Scope';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as _Array from './ion/Array';
import * as Parameter from './Parameter';
import * as Block from './Block';
import * as Type from './Type';
import * as Class from './ion/Class';
export class FunctionExpression implements _Object.Object , Expression.Expression , Scope.Scope , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Identifier.Identifier | Null.Null;
    readonly parameters: _Array.Array<Parameter.Parameter>;
    readonly body: Block.Block;
    readonly returnType: Type.Type | Null.Null;
    static readonly id = 'FunctionExpression';
    static readonly implements = new Set([
        'FunctionExpression',
        'ion_Object',
        'Expression',
        'Scope',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, id = null, parameters, body, returnType = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        parameters: _Array.Array<Parameter.Parameter>,
        body: Block.Block,
        returnType?: Type.Type | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Identifier.isIdentifier(id) || Null.isNull(id)))
            throw new Error('id is not a Identifier | Null: ' + Class.toString(id));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        if (!Block.isBlock(body))
            throw new Error('body is not a Block: ' + Class.toString(body));
        if (!(Type.isType(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Type | Null: ' + Class.toString(returnType));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.id = id;
        this.parameters = parameters;
        this.body = body;
        this.returnType = returnType;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Identifier.Identifier | Null.Null,
        parameters?: _Array.Array<Parameter.Parameter>,
        body?: Block.Block,
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