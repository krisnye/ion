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
export class Conditional implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly test: Expression.Expression;
    readonly consequent: Expression.Expression;
    readonly alternate: Expression.Expression | Null.Null;
    static readonly id = 'Conditional';
    static readonly implements = new Set([
        'Conditional',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, test, consequent, alternate}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        test: Expression.Expression,
        consequent: Expression.Expression,
        alternate: Expression.Expression | Null.Null
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Expression.isExpression(test))
            throw new Error('test is not a Expression: ' + Class.toString(test));
        if (!Expression.isExpression(consequent))
            throw new Error('consequent is not a Expression: ' + Class.toString(consequent));
        if (!(Expression.isExpression(alternate) || Null.isNull(alternate)))
            throw new Error('alternate is not a Expression | Null: ' + Class.toString(alternate));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        test?: Expression.Expression,
        consequent?: Expression.Expression,
        alternate?: Expression.Expression | Null.Null
    }) {
        return new Conditional({
            ...this,
            ...properties
        });
    }
    static is(value): value is Conditional {
        return isConditional(value);
    }
}
export function isConditional(value): value is Conditional {
    return Class.isInstance(Conditional, value);
}
export default Conditional;