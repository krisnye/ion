/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Variable from './Variable';
import * as Declaration from './Declaration';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as Id from './Id';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Parameter from './Parameter';
import * as Class from './ion/Class';
export class TypeDeclaration implements _Object.Object , Variable.Variable , Declaration.Declaration , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly id: Id.Id;
    readonly value: TypeDefinition.TypeDefinition | Reference.Reference;
    readonly assignable: Boolean.Boolean;
    readonly export: Boolean.Boolean;
    readonly parameters: _Array.Array<Parameter.Parameter>;
    static readonly id = 'TypeDeclaration';
    static readonly implements = new Set([
        'TypeDeclaration',
        'ion_Object',
        'Variable',
        'Declaration',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        id,
        value,
        assignable = false,
        export: _export = false,
        parameters = []
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id: Id.Id,
        value: TypeDefinition.TypeDefinition | Reference.Reference,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        parameters?: _Array.Array<Parameter.Parameter>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!Id.isId(id))
            throw new Error('id is not a Id: ' + Class.toString(id));
        if (!(TypeDefinition.isTypeDefinition(value) || Reference.isReference(value)))
            throw new Error('value is not a TypeDefinition | Reference: ' + Class.toString(value));
        if (!Boolean.isBoolean(assignable))
            throw new Error('assignable is not a Boolean: ' + Class.toString(assignable));
        if (!Boolean.isBoolean(_export))
            throw new Error('export is not a Boolean: ' + Class.toString(_export));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        this.location = location;
        this.type = type;
        this.id = id;
        this.value = value;
        this.assignable = assignable;
        this.export = _export;
        this.parameters = parameters;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id?: Id.Id,
        value?: TypeDefinition.TypeDefinition | Reference.Reference,
        assignable?: Boolean.Boolean,
        export?: Boolean.Boolean,
        parameters?: _Array.Array<Parameter.Parameter>
    }) {
        return new TypeDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is TypeDeclaration {
        return isTypeDeclaration(value);
    }
}
export function isTypeDeclaration(value): value is TypeDeclaration {
    return Class.isInstance(TypeDeclaration, value);
}
export default TypeDeclaration;