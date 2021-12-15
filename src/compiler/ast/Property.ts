/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Declaration from './Declaration';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Statement from './Statement';
import * as SideEffect from './SideEffect';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Identifier from './Identifier';
import * as Declarator from './Declarator';
import * as Class from './ion/Class';
export class Property implements _Object.Object , Expression.Expression , Declaration.Declaration , Typed.Typed , Node.Node , Statement.Statement , SideEffect.SideEffect {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly id: Expression.Expression | (Identifier.Identifier | Declarator.Declarator);
    readonly isMutable: Boolean.Boolean;
    readonly value: Expression.Expression | (Identifier.Identifier | Null.Null);
    static readonly id = 'Property';
    static readonly implements = new Set([
        'Property',
        'ion_Object',
        'Expression',
        'Declaration',
        'Typed',
        'Node',
        'Statement',
        'SideEffect'
    ]);
    constructor({location = null, type = null, resolved = false, id, isMutable = false, value}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id: Expression.Expression | (Identifier.Identifier | Declarator.Declarator),
        isMutable?: Boolean.Boolean,
        value: Expression.Expression | (Identifier.Identifier | Null.Null)
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(Expression.isExpression(id) || (Identifier.isIdentifier(id) || Declarator.isDeclarator(id))))
            throw new Error('id is not a Expression | Identifier | Declarator: ' + Class.toString(id));
        if (!Boolean.isBoolean(isMutable))
            throw new Error('isMutable is not a Boolean: ' + Class.toString(isMutable));
        if (!(Expression.isExpression(value) || (Identifier.isIdentifier(value) || Null.isNull(value))))
            throw new Error('value is not a Expression | Identifier | Null: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.id = id;
        this.isMutable = isMutable;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        id?: Expression.Expression | (Identifier.Identifier | Declarator.Declarator),
        isMutable?: Boolean.Boolean,
        value?: Expression.Expression | (Identifier.Identifier | Null.Null)
    }) {
        return new Property({
            ...this,
            ...properties
        });
    }
    static is(value): value is Property {
        return isProperty(value);
    }
}
export function isProperty(value): value is Property {
    return Class.isInstance(Property, value);
}
export default Property;