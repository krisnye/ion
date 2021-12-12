/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as ChainElement from './ChainElement';
import * as Type from './Type';
import * as RuntimeType from './RuntimeType';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Identifier from './Identifier';
import * as Class from './ion/Class';
export class MemberExpression implements _Object.Object , Expression.Expression , ChainElement.ChainElement , Type.Type , RuntimeType.RuntimeType , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly optional: Boolean.Boolean;
    readonly object: Expression.Expression;
    readonly property: Identifier.Identifier | Expression.Expression;
    static readonly id = 'MemberExpression';
    static readonly implements = new Set([
        'MemberExpression',
        'ion_Object',
        'Expression',
        'ChainElement',
        'Type',
        'RuntimeType',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, optional = false, object, property}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        optional?: Boolean.Boolean,
        object: Expression.Expression,
        property: Identifier.Identifier | Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Boolean.isBoolean(optional))
            throw new Error('optional is not a Boolean: ' + Class.toString(optional));
        if (!Expression.isExpression(object))
            throw new Error('object is not a Expression: ' + Class.toString(object));
        if (!(Identifier.isIdentifier(property) || Expression.isExpression(property)))
            throw new Error('property is not a Identifier | Expression: ' + Class.toString(property));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.optional = optional;
        this.object = object;
        this.property = property;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        optional?: Boolean.Boolean,
        object?: Expression.Expression,
        property?: Identifier.Identifier | Expression.Expression
    }) {
        return new MemberExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is MemberExpression {
        return isMemberExpression(value);
    }
}
export function isMemberExpression(value): value is MemberExpression {
    return Class.isInstance(MemberExpression, value);
}
export default MemberExpression;