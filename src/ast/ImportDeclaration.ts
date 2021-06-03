/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as Id from './Id';
import * as Boolean from './ion/Boolean';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class ImportDeclaration implements _Object.Object , Declaration.Declaration , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly id: Id.Id;
    readonly export: Boolean.Boolean;
    readonly assignable: Boolean.Boolean;
    readonly from: String.String;
    static readonly id = 'ImportDeclaration';
    static readonly implements = new Set([
        'ImportDeclaration',
        'ion_Object',
        'Declaration',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        id,
        export: _export = false,
        assignable = false,
        from
    }: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id: Id.Id,
        export?: Boolean.Boolean,
        assignable?: Boolean.Boolean,
        from: String.String
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
        if (!String.isString(from))
            throw new Error('from is not a String: ' + Class.toString(from));
        this.location = location;
        this.type = type;
        this.id = id;
        this.export = _export;
        this.assignable = assignable;
        this.from = from;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        id?: Id.Id,
        export?: Boolean.Boolean,
        assignable?: Boolean.Boolean,
        from?: String.String
    }) {
        return new ImportDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is ImportDeclaration {
        return isImportDeclaration(value);
    }
}
export function isImportDeclaration(value): value is ImportDeclaration {
    return Class.isInstance(ImportDeclaration, value);
}
export default ImportDeclaration;