/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Reference from './Reference';
import * as Expression from './Expression';
import * as Class from './ion/Class';
export class AssignmentStatement implements _Object.Object , Statement.Statement , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly left: Reference.Reference;
    readonly right: Expression.Expression;
    static readonly id = 'AssignmentStatement';
    static readonly implements = new Set([
        'AssignmentStatement',
        'ion_Object',
        'Statement',
        'Node'
    ]);
    constructor({location = null, left, right}: {
        location?: Location.Location | Null.Null,
        left: Reference.Reference,
        right: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!Reference.isReference(left))
            throw new Error('left is not a Reference: ' + Class.toString(left));
        if (!Expression.isExpression(right))
            throw new Error('right is not a Expression: ' + Class.toString(right));
        this.location = location;
        this.left = left;
        this.right = right;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        left?: Reference.Reference,
        right?: Expression.Expression
    }) {
        return new AssignmentStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is AssignmentStatement {
        return isAssignmentStatement(value);
    }
}
export function isAssignmentStatement(value): value is AssignmentStatement {
    return Class.isInstance(AssignmentStatement, value);
}
export default AssignmentStatement;