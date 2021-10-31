/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Identifier from './Identifier';
import * as Pattern from './Pattern';
import * as Class from './ion/Class';
export class Property implements _Object.Object , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly key: Expression.Expression | Identifier.Identifier;
    readonly value: Expression.Expression | (Identifier.Identifier | (Pattern.Pattern | Null.Null));
    static readonly id = 'Property';
    static readonly implements = new Set([
        'Property',
        'ion_Object',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, key, value}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key: Expression.Expression | Identifier.Identifier,
        value: Expression.Expression | (Identifier.Identifier | (Pattern.Pattern | Null.Null))
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(key) || Identifier.isIdentifier(key)))
            throw new Error('key is not a Expression | Identifier: ' + Class.toString(key));
        if (!(Expression.isExpression(value) || (Identifier.isIdentifier(value) || (Pattern.isPattern(value) || Null.isNull(value)))))
            throw new Error('value is not a Expression | Identifier | Pattern | Null: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.key = key;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key?: Expression.Expression | Identifier.Identifier,
        value?: Expression.Expression | (Identifier.Identifier | (Pattern.Pattern | Null.Null))
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