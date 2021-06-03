/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class Argument implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly name: String.String | Null.Null;
    readonly value: Expression.Expression;
    static readonly id = 'Argument';
    static readonly implements = new Set([
        'Argument',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, name = null, value}: {
        location?: Location.Location | Null.Null,
        name?: String.String | Null.Null,
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(String.isString(name) || Null.isNull(name)))
            throw new Error('name is not a String | Null: ' + Class.toString(name));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.name = name;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        name?: String.String | Null.Null,
        value?: Expression.Expression
    }) {
        return new Argument({
            ...this,
            ...properties
        });
    }
    static is(value): value is Argument {
        return isArgument(value);
    }
}
export function isArgument(value): value is Argument {
    return Class.isInstance(Argument, value);
}
export default Argument;