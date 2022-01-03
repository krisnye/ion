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
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as _Array from './ion/Array';
import * as RestElement from './RestElement';
import * as Class from './ion/Class';
export class ArrayPattern implements _Object.Object , Pattern.Pattern , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly elements: _Array.Array<Pattern.Pattern | (RestElement.RestElement | Null.Null)>;
    static readonly id = 'ArrayPattern';
    static readonly implements = new Set([
        'ArrayPattern',
        'ion_Object',
        'Pattern',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, elements}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        elements: _Array.Array<Pattern.Pattern | (RestElement.RestElement | Null.Null)>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(elements))
            throw new Error('elements is not a Array: ' + Class.toString(elements));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.elements = elements;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        elements?: _Array.Array<Pattern.Pattern | (RestElement.RestElement | Null.Null)>
    }) {
        return new ArrayPattern({
            ...this,
            ...properties
        });
    }
    static is(value): value is ArrayPattern {
        return isArrayPattern(value);
    }
}
export function isArrayPattern(value): value is ArrayPattern {
    return Class.isInstance(ArrayPattern, value);
}
export default ArrayPattern;