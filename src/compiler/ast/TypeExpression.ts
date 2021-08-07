/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Number from './ion/Number';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class TypeExpression implements _Object.Object , Type.Type , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: Expression.Expression;
    static readonly id = 'TypeExpression';
    static readonly implements = new Set([
        'TypeExpression',
        'ion_Object',
        'Type',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, value}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value: Expression.Expression
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value?: Expression.Expression
    }) {
        return new TypeExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is TypeExpression {
        return isTypeExpression(value);
    }
}
export function isTypeExpression(value): value is TypeExpression {
    return Class.isInstance(TypeExpression, value);
}
export default TypeExpression;