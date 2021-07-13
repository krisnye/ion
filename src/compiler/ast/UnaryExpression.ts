/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class UnaryExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly operator: String.String;
    readonly argument: Expression.Expression;
    readonly prefix: Boolean.Boolean;
    static readonly id = 'UnaryExpression';
    static readonly implements = new Set([
        'UnaryExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, operator, argument, prefix = true}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        operator: String.String,
        argument: Expression.Expression,
        prefix?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!String.isString(operator))
            throw new Error('operator is not a String: ' + Class.toString(operator));
        if (!Expression.isExpression(argument))
            throw new Error('argument is not a Expression: ' + Class.toString(argument));
        if (!Boolean.isBoolean(prefix))
            throw new Error('prefix is not a Boolean: ' + Class.toString(prefix));
        this.location = location;
        this.type = type;
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        operator?: String.String,
        argument?: Expression.Expression,
        prefix?: Boolean.Boolean
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