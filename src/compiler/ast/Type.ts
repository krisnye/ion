/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class Type implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    static readonly id = 'Type';
    static readonly implements = new Set([
        'Type',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        this.$ = $;
        this.location = location;
        this.type = type;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null
    }) {
        return new Type({
            ...this,
            ...properties
        });
    }
    static is(value): value is Type {
        return isType(value);
    }
}
export function isType(value): value is Type {
    return Class.isInstance(Type, value);
}
export default Type;