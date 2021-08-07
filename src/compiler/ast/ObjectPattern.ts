/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as RestElement from './RestElement';
import * as Class from './ion/Class';
export class ObjectPattern implements _Object.Object , Pattern.Pattern , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly properties: _Array.Array<Property.Property | RestElement.RestElement>;
    static readonly id = 'ObjectPattern';
    static readonly implements = new Set([
        'ObjectPattern',
        'ion_Object',
        'Pattern',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, properties}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        properties: _Array.Array<Property.Property | RestElement.RestElement>
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        properties?: _Array.Array<Property.Property | RestElement.RestElement>
    }) {
        return new ObjectPattern({
            ...this,
            ...properties
        });
    }
    static is(value): value is ObjectPattern {
        return isObjectPattern(value);
    }
}
export function isObjectPattern(value): value is ObjectPattern {
    return Class.isInstance(ObjectPattern, value);
}
export default ObjectPattern;