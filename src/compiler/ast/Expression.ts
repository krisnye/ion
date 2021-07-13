/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Expression implements _Object.Object , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression | Null.Null;
    static readonly id = 'Expression';
    static readonly implements = new Set([
        'Expression',
        'ion_Object',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null}: {
        location?: Location.Location | Null.Null,
        type?: Expression | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression | Null.Null
    }) {
        return new Expression({
            ...this,
            ...properties
        });
    }
    static is(value): value is Expression {
        return isExpression(value);
    }
}
export function isExpression(value): value is Expression {
    return Class.isInstance(Expression, value);
}
export default Expression;