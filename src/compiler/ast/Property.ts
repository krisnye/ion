/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Identifier from './Identifier';
import * as Pattern from './Pattern';
import * as Class from './ion/Class';
export class Property implements _Object.Object , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly key: Expression.Expression | Identifier.Identifier;
    readonly value: Expression.Expression | (Pattern.Pattern | Null.Null);
    static readonly id = 'Property';
    static readonly implements = new Set([
        'Property',
        'ion_Object',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, key, value}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key: Expression.Expression | Identifier.Identifier,
        value: Expression.Expression | (Pattern.Pattern | Null.Null)
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Expression.isExpression(key) || Identifier.isIdentifier(key)))
            throw new Error('key is not a Expression | Identifier: ' + Class.toString(key));
        if (!(Expression.isExpression(value) || (Pattern.isPattern(value) || Null.isNull(value))))
            throw new Error('value is not a Expression | Pattern | Null: ' + Class.toString(value));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.key = key;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        key?: Expression.Expression | Identifier.Identifier,
        value?: Expression.Expression | (Pattern.Pattern | Null.Null)
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