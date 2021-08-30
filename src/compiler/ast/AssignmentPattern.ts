/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Assignment from './Assignment';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Reference from './Reference';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class AssignmentPattern implements _Object.Object , Assignment.Assignment , Pattern.Pattern , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly left: Pattern.Pattern | Reference.Reference;
    readonly operator: String.String;
    readonly right: Expression.Expression;
    static readonly id = 'AssignmentPattern';
    static readonly implements = new Set([
        'AssignmentPattern',
        'ion_Object',
        'Assignment',
        'Pattern',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, left, operator = '=', right}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left: Pattern.Pattern | Reference.Reference,
        operator?: String.String,
        right: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(Pattern.isPattern(left) || Reference.isReference(left)))
            throw new Error('left is not a Pattern | Reference: ' + Class.toString(left));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        this.location = location;
        this.type = type;
        this.left = left;
        this.operator = operator;
        this.right = right;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        left?: Pattern.Pattern | Reference.Reference,
        operator?: String.String,
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