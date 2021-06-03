/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as ChainElement from './ChainElement';
import * as Type from './Type';
import * as RuntimeType from './RuntimeType';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Identifier from './Identifier';
import * as Class from './ion/Class';
export class MemberExpression implements _Object.Object , Expression.Expression , ChainElement.ChainElement , Type.Type , RuntimeType.RuntimeType , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
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
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, optional = false, object, property}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        optional?: Boolean.Boolean,
        object: Expression.Expression,
        property: Identifier.Identifier | Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(optional))
            throw new Error('optional is not a Boolean: ' + Class.toString(optional));
        if (!Expression.isExpression(object))
            throw new Error('object is not a Expression: ' + Class.toString(object));
        if (!(Identifier.isIdentifier(property) || Expression.isExpression(property)))
            throw new Error('property is not a Identifier | Expression: ' + Class.toString(property));
        this.location = location;
        this.type = type;
        this.optional = optional;
        this.object = object;
        this.property = property;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
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