/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Declarator from './Declarator';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Class from './ion/Class';
export class EnumDeclaration implements _Object.Object , Declaration.Declaration , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly id: Declarator.Declarator;
    readonly flags: Boolean.Boolean;
    readonly properties: _Array.Array<Property.Property>;
    static readonly id = 'EnumDeclaration';
    static readonly implements = new Set([
        'EnumDeclaration',
        'ion_Object',
        'Declaration',
        'Statement',
        'Node'
    ]);
    constructor({location = null, id, flags = false, properties}: {
        location?: Location.Location | Null.Null,
        id: Declarator.Declarator,
        flags?: Boolean.Boolean,
        properties: _Array.Array<Property.Property>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!Boolean.isBoolean(flags))
            throw new Error('flags is not a Boolean: ' + Class.toString(flags));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.location = location;
        this.id = id;
        this.flags = flags;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        id?: Declarator.Declarator,
        flags?: Boolean.Boolean,
        properties?: _Array.Array<Property.Property>
    }) {
        return new EnumDeclaration({
            ...this,
            ...properties
        });
    }
    static is(value): value is EnumDeclaration {
        return isEnumDeclaration(value);
    }
}
export function isEnumDeclaration(value): value is EnumDeclaration {
    return Class.isInstance(EnumDeclaration, value);
}
export default EnumDeclaration;