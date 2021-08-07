/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Declaration from './Declaration';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Boolean from './ion/Boolean';
import * as Declarator from './Declarator';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Class from './ion/Class';
export class EnumDeclaration implements _Object.Object , Declaration.Declaration , Statement.Statement , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly flags: Boolean.Boolean;
    readonly id: Declarator.Declarator;
    readonly properties: _Array.Array<Property.Property>;
    static readonly id = 'EnumDeclaration';
    static readonly implements = new Set([
        'EnumDeclaration',
        'ion_Object',
        'Declaration',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, flags = false, id, properties}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        flags?: Boolean.Boolean,
        id: Declarator.Declarator,
        properties: _Array.Array<Property.Property>
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(flags))
            throw new Error('flags is not a Boolean: ' + Class.toString(flags));
        if (!Declarator.isDeclarator(id))
            throw new Error('id is not a Declarator: ' + Class.toString(id));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.flags = flags;
        this.id = id;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        flags?: Boolean.Boolean,
        id?: Declarator.Declarator,
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