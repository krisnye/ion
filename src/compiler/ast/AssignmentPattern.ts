/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Assignment from './Assignment';
import * as Pattern from './Pattern';
import * as Expression from './Expression';
import * as SideEffect from './SideEffect';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Boolean from './ion/Boolean';
import * as Reference from './Reference';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class AssignmentPattern implements _Object.Object , Assignment.Assignment , Pattern.Pattern , Expression.Expression , SideEffect.SideEffect , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
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
        'SideEffect',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, left, operator = '=', right}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        left: Pattern.Pattern | Reference.Reference,
        operator?: String.String,
        right: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!(Pattern.isPattern(left) || Reference.isReference(left)))
            throw new Error('left is not a Pattern | Reference: ' + Class.toString(left));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.left = left;
        this.operator = operator;
        this.right = right;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
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