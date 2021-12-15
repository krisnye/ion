/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Declarator from './Declarator';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Class from './ion/Class';
export class EnumDeclaration implements _Object.Object , Declaration.Declaration , Statement.Statement , SideEffect.SideEffect , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly id: Declarator.Declarator;
    readonly isMutable: Boolean.Boolean;
    readonly flags: Boolean.Boolean;
    readonly properties: _Array.Array<Property.Property>;
    static readonly id = 'EnumDeclaration';
    static readonly implements = new Set([
        'EnumDeclaration',
        'ion_Object',
        'Declaration',
        'Statement',
        'SideEffect',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, id, isMutable = false, flags = false, properties}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id: Declarator.Declarator,
        isMutable?: Boolean.Boolean,
        flags?: Boolean.Boolean,
        properties: _Array.Array<Property.Property>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        if (!Boolean.isBoolean(flags))
            throw new Error('flags is not a Boolean: ' + Class.toString(flags));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.id = id;
        this.isMutable = isMutable;
        this.flags = flags;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id?: Declarator.Declarator,
        isMutable?: Boolean.Boolean,
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