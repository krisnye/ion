/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Expression implements _Object.Object , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression | Null.Null;
    static readonly id = 'Expression';
    static readonly implements = new Set([
        'Expression',
        'ion_Object',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        this.$ = $;
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
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