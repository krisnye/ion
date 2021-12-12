/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Variable from './Variable';
import * as Block from './Block';
import * as Class from './ion/Class';
export class For implements _Object.Object , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly left: Variable.Variable;
    readonly count: Variable.Variable | Null.Null;
    readonly right: Expression.Expression;
    readonly body: Block.Block;
    static readonly id = 'For';
    static readonly implements = new Set([
        'For',
        'ion_Object',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, left, count, right, body}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        left: Variable.Variable,
        count: Variable.Variable | Null.Null,
        right: Expression.Expression,
        body: Block.Block
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!Variable.isVariable(left))
            throw new Error('left is not a Variable: ' + Class.toString(left));
        if (!(Variable.isVariable(count) || Null.isNull(count)))
            throw new Error('count is not a Variable | Null: ' + Class.toString(count));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        if (!Block.isBlock(body))
            throw new Error('body is not a Block: ' + Class.toString(body));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.left = left;
        this.count = count;
        this.right = right;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        left?: Variable.Variable,
        count?: Variable.Variable | Null.Null,
        right?: Expression.Expression,
        body?: Block.Block
    }) {
        return new For({
            ...this,
            ...properties
        });
    }
    static is(value): value is For {
        return isFor(value);
    }
}
export function isFor(value): value is For {
    return Class.isInstance(For, value);
}
export default For;