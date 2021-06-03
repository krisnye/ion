/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Id from './Id';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class Property implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly key: Id.Id | (Expression.Expression | Null.Null);
    readonly value: Expression.Expression;
    static readonly id = 'Property';
    static readonly implements = new Set([
        'Property',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, key = null, value}: {
        location?: Location.Location | Null.Null,
        key?: Id.Id | (Expression.Expression | Null.Null),
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Id.isId(key) || (Expression.isExpression(key) || Null.isNull(key))))
            throw new Error('key is not a Id | Expression | Null: ' + Class.toString(key));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.key = key;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        key?: Id.Id | (Expression.Expression | Null.Null),
        value?: Expression.Expression
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