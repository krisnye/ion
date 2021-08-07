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
export class AwaitExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly argument: Expression.Expression;
    static readonly id = 'AwaitExpression';
    static readonly implements = new Set([
        'AwaitExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, argument}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        argument: Expression.Expression
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        argument?: Expression.Expression
    }) {
        return new AwaitExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is AwaitExpression {
        return isAwaitExpression(value);
    }
}
export function isAwaitExpression(value): value is AwaitExpression {
    return Class.isInstance(AwaitExpression, value);
}
export default AwaitExpression;