/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as String from './ion/String';
import * as Pattern from './Pattern';
import * as Class from './ion/Class';
export class AssignmentExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly operator: String.String;
    readonly left: Pattern.Pattern | Expression.Expression;
    readonly right: Expression.Expression;
    static readonly id = 'AssignmentExpression';
    static readonly implements = new Set([
        'AssignmentExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, operator = '=', left, right}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        operator?: String.String,
        left: Pattern.Pattern | Expression.Expression,
        right: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        if (!(Pattern.isPattern(left) || Expression.isExpression(left)))
            throw new Error('left is not a Pattern | Expression: ' + Class.toString(left));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        this.location = location;
        this.type = type;
        this.operator = operator;
        this.left = left;
        this.right = right;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        operator?: String.String,
        left?: Pattern.Pattern | Expression.Expression,
        right?: Expression.Expression
    }) {
        return new AssignmentExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is AssignmentExpression {
        return isAssignmentExpression(value);
    }
}
export function isAssignmentExpression(value): value is AssignmentExpression {
    return Class.isInstance(AssignmentExpression, value);
}
export default AssignmentExpression;