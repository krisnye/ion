/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class TemplateReference implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly reference: Reference.Reference;
    readonly arguments: _Array.Array<Expression.Expression>;
    static readonly id = 'TemplateReference';
    static readonly implements = new Set([
        'TemplateReference',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        reference,
        arguments: _arguments
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        reference: Reference.Reference,
        arguments: _Array.Array<Expression.Expression>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!Reference.isReference(reference))
            throw new Error('reference is not a Reference: ' + Class.toString(reference));
        if (!_Array.isArray(_arguments))
            throw new Error('arguments is not a Array: ' + Class.toString(_arguments));
        this.location = location;
        this.type = type;
        this.reference = reference;
        this.arguments = _arguments;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        reference?: Reference.Reference,
        arguments?: _Array.Array<Expression.Expression>
    }) {
        return new TemplateReference({
            ...this,
            ...properties
        });
    }
    static is(value): value is TemplateReference {
        return isTemplateReference(value);
    }
}
export function isTemplateReference(value): value is TemplateReference {
    return Class.isInstance(TemplateReference, value);
}
export default TemplateReference;