/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Reference from './Reference';
import * as Class from './ion/Class';
export class TypeDefinition implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition | (Reference.Reference | Null.Null);
    static readonly id = 'TypeDefinition';
    static readonly implements = new Set([
        'TypeDefinition',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null}: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition | (Reference.Reference | Null.Null)
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition | (Reference.Reference | Null.Null)
    }) {
        return new TypeDefinition({
            ...this,
            ...properties
        });
    }
    static is(value): value is TypeDefinition {
        return isTypeDefinition(value);
    }
}
export function isTypeDefinition(value): value is TypeDefinition {
    return Class.isInstance(TypeDefinition, value);
}
export default TypeDefinition;