/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Pattern from './Pattern';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class AssignmentPattern implements _Object.Object , Pattern.Pattern , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly left: Pattern.Pattern;
    readonly right: Expression.Expression;
    static readonly id = 'AssignmentPattern';
    static readonly implements = new Set([
        'AssignmentPattern',
        'ion_Object',
        'Pattern',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, left, right}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left: Pattern.Pattern,
        right: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Pattern.isPattern(left))
            throw new Error('left is not a Pattern: ' + Class.toString(left));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        this.location = location;
        this.type = type;
        this.left = left;
        this.right = right;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left?: Pattern.Pattern,
        right?: Expression.Expression
    }) {
        return new AssignmentPattern({
            ...this,
            ...properties
        });
    }
    static is(value): value is AssignmentPattern {
        return isAssignmentPattern(value);
    }
}
export function isAssignmentPattern(value): value is AssignmentPattern {
    return Class.isInstance(AssignmentPattern, value);
}
export default AssignmentPattern;