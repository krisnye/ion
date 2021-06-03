/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Id from './Id';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Typed from './Typed';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as TypeDefinition from './TypeDefinition';
import * as Class from './ion/Class';
export class Reference implements _Object.Object , Id.Id , Expression.Expression , Node.Node , Typed.Typed {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String;
    readonly type: TypeDefinition.TypeDefinition | (Reference | Null.Null);
    static readonly id = 'Reference';
    static readonly implements = new Set([
        'Reference',
        'ion_Object',
        'Id',
        'Expression',
        'Node',
        'Typed'
    ]);
    constructor({location = null, name, type = null}: {
        location?: Location.Location | Null.Null,
        name: String.String,
        type?: TypeDefinition.TypeDefinition | (Reference | Null.Null)
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!String.isString(name))
            throw new Error('name is not a String: ' + Class.toString(name));
        if (!(TypeDefinition.isTypeDefinition(type) || (isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        this.location = location;
        this.name = name;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String,
        type?: TypeDefinition.TypeDefinition | (Reference | Null.Null)
    }) {
        return new Reference({
            ...this,
            ...properties
        });
    }
    static is(value): value is Reference {
        return isReference(value);
    }
}
export function isReference(value): value is Reference {
    return Class.isInstance(Reference, value);
}
export default Reference;