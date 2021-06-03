/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as TypeDefinition from './TypeDefinition';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Reference from './Reference';
import * as _Array from './ion/Array';
import * as Parameter from './Parameter';
import * as Class from './ion/Class';
export class FunctionType implements _Object.Object , TypeDefinition.TypeDefinition , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly parameters: _Array.Array<Parameter.Parameter>;
    readonly returnType: Expression.Expression | Null.Null;
    static readonly id = 'FunctionType';
    static readonly implements = new Set([
        'FunctionType',
        'ion_Object',
        'TypeDefinition',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, parameters, returnType = null}: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        parameters: _Array.Array<Parameter.Parameter>,
        returnType?: Expression.Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        if (!(Expression.isExpression(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Expression | Null: ' + Class.toString(returnType));
        this.location = location;
        this.type = type;
        this.parameters = parameters;
        this.returnType = returnType;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        parameters?: _Array.Array<Parameter.Parameter>,
        returnType?: Expression.Expression | Null.Null
    }) {
        return new FunctionType({
            ...this,
            ...properties
        });
    }
    static is(value): value is FunctionType {
        return isFunctionType(value);
    }
}
export function isFunctionType(value): value is FunctionType {
    return Class.isInstance(FunctionType, value);
}
export default FunctionType;