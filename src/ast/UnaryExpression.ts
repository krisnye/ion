/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as TypeDefinition from './TypeDefinition';
import * as Reference from './Reference';
import * as String from './ion/String';
import * as Class from './ion/Class';
export class UnaryExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null);
    readonly operator: String.String;
    readonly argument: Expression.Expression;
    static readonly id = 'UnaryExpression';
    static readonly implements = new Set([
        'UnaryExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, operator, argument}: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        operator: String.String,
        argument: Expression.Expression
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(TypeDefinition.isTypeDefinition(type) || (Reference.isReference(type) || Null.isNull(type))))
            throw new Error('type is not a TypeDefinition | Reference | Null: ' + Class.toString(type));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        this.location = location;
        this.type = type;
        this.operator = operator;
        this.argument = argument;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: TypeDefinition.TypeDefinition | (Reference.Reference | Null.Null),
        operator?: String.String,
        argument?: Expression.Expression
    }) {
        return new UnaryExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is UnaryExpression {
        return isUnaryExpression(value);
    }
}
export function isUnaryExpression(value): value is UnaryExpression {
    return Class.isInstance(UnaryExpression, value);
}
export default UnaryExpression;