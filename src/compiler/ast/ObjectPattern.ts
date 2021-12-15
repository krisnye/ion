/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as PatternProperty from './PatternProperty';
import * as RestElement from './RestElement';
import * as Class from './ion/Class';
export class ObjectPattern implements _Object.Object , Pattern.Pattern , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly kind: String.String;
    readonly properties: _Array.Array<PatternProperty.PatternProperty | RestElement.RestElement>;
    static readonly id = 'ObjectPattern';
    static readonly implements = new Set([
        'ObjectPattern',
        'ion_Object',
        'Pattern',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, kind = 'Object', properties}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        kind?: String.String,
        properties: _Array.Array<PatternProperty.PatternProperty | RestElement.RestElement>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!String.isString(kind))
            throw new Error('kind is not a String: ' + Class.toString(kind));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.kind = kind;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        kind?: String.String,
        properties?: _Array.Array<PatternProperty.PatternProperty | RestElement.RestElement>
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