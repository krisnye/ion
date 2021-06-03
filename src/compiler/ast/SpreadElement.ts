/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class SpreadElement implements _Object.Object , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly argument: Expression.Expression;
    static readonly id = 'SpreadElement';
    static readonly implements = new Set([
        'SpreadElement',
        'ion_Object',
        'Node'
    ]);
    constructor({location = null, argument}: {
        location?: Location.Location | Null.Null,
        argument: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        this.location = location;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        argument?: Expression.Expression
    }) {
        return new SpreadElement({
            ...this,
            ...properties
        });
    }
    static is(value): value is SpreadElement {
        return isSpreadElement(value);
    }
}
export function isSpreadElement(value): value is SpreadElement {
    return Class.isInstance(SpreadElement, value);
}
export default SpreadElement;