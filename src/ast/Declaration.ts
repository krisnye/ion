/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as Id from './Id';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Declaration implements _Object.Object , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly id: Id.Id;
    readonly export: Boolean.Boolean;
    readonly assignable: Boolean.Boolean;
    static readonly id = 'Declaration';
    static readonly implements = new Set([
        'Declaration',
        'ion_Object',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        id,
        export: _export = false,
        assignable = false
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id: Id.Id,
        export?: Boolean.Boolean,
        assignable?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!Id.isId(id))
            throw new Error('id is not a Id: ' + Class.toString(id));
        if (!Boolean.isBoolean(_export))
            throw new Error('export is not a Boolean: ' + Class.toString(_export));
        if (!Boolean.isBoolean(assignable))
            throw new Error('assignable is not a Boolean: ' + Class.toString(assignable));
        this.location = location;
        this.type = type;
        this.id = id;
        this.export = _export;
        this.assignable = assignable;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id?: Id.Id,
        export?: Boolean.Boolean,
        assignable?: Boolean.Boolean
    }) {
        return new Declaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is Declaration {
        return isDeclaration(value);
    }
}
export function isDeclaration(value): value is Declaration {
    return Class.isInstance(Declaration, value);
}
export default Declaration;