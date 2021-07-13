/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Expression from './Expression';
import * as Reference from './Reference';
import * as Class from './ion/Class';
export class AssignmentStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly id: Reference.Reference;
    readonly value: Expression.Expression;
    static readonly id = 'AssignmentStatement';
    static readonly implements = new Set([
        'AssignmentStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, id, value}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id: Reference.Reference,
        value: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Reference.isReference(id))
            throw new Error('id is not a Reference: ' + Class.toString(id));
        if (!Expression.isExpression(value))
            throw new Error('value is not a Expression: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.id = id;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        id?: Reference.Reference,
        value?: Expression.Expression
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