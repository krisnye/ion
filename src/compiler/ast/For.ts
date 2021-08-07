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
import * as Pattern from './Pattern';
import * as VariableDeclaration from './VariableDeclaration';
import * as Block from './Block';
import * as Class from './ion/Class';
export class For implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly $: Number.Number;
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly left: Pattern.Pattern;
    readonly count: VariableDeclaration.VariableDeclaration;
    readonly right: Expression.Expression;
    readonly body: Block.Block;
    static readonly id = 'For';
    static readonly implements = new Set([
        'For',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({$ = 0, location = null, type = null, left, count, right, body}: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left: Pattern.Pattern,
        count: VariableDeclaration.VariableDeclaration,
        right: Expression.Expression,
        body: Block.Block
    }) {
        if (!Number.isNumber($))
            throw new Error('$ is not a Number: ' + Class.toString($));
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Pattern.isPattern(left))
            throw new Error('left is not a Pattern: ' + Class.toString(left));
        if (!VariableDeclaration.isVariableDeclaration(count))
            throw new Error('count is not a VariableDeclaration: ' + Class.toString(count));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        if (!Block.isBlock(body))
            throw new Error('body is not a Block: ' + Class.toString(body));
        this.$ = $;
        this.location = location;
        this.type = type;
        this.left = left;
        this.count = count;
        this.right = right;
        this.body = body;
        Object.freeze(this);
    }
    patch(properties: {
        $?: Number.Number,
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left?: Pattern.Pattern,
        count?: VariableDeclaration.VariableDeclaration,
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