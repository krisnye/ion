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
import * as Class from './ion/Class';
export class ArrayPattern implements _Object.Object , Pattern.Pattern , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly elements: _Array.Array<Pattern.Pattern | Null.Null>;
    static readonly id = 'ArrayPattern';
    static readonly implements = new Set([
        'ArrayPattern',
        'ion_Object',
        'Pattern',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, elements}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        elements: _Array.Array<Pattern.Pattern | Null.Null>
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(elements))
            throw new Error('elements is not a Array: ' + Class.toString(elements));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.elements = elements;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        elements?: _Array.Array<Pattern.Pattern | Null.Null>
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