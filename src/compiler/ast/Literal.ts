/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as RuntimeType from './RuntimeType';
import * as Node from './Node';
import * as Type from './Type';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as Number from './ion/Number';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class Literal implements _Object.Object , Expression.Expression , RuntimeType.RuntimeType , Node.Node , Type.Type {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: String.String | (Number.Number | (Boolean.Boolean | Null.Null));
    readonly integer: Boolean.Boolean;
    static readonly id = 'Literal';
    static readonly implements = new Set([
        'Literal',
        'ion_Object',
        'Expression',
        'RuntimeType',
        'Node',
        'Type'
    ]);
    constructor({location = null, type = null, value, integer = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value: String.String | (Number.Number | (Boolean.Boolean | Null.Null)),
        integer?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!(String.isString(value) || (Number.isNumber(value) || (Boolean.isBoolean(value) || Null.isNull(value)))))
            throw new Error('value is not a String | Number | Boolean | Null: ' + Class.toString(value));
        if (!Boolean.isBoolean(integer))
            throw new Error('integer is not a Boolean: ' + Class.toString(integer));
        this.location = location;
        this.type = type;
        this.value = value;
        this.integer = integer;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value?: String.String | (Number.Number | (Boolean.Boolean | Null.Null)),
        integer?: Boolean.Boolean
    }) {
        return new Literal({
            ...this,
            ...properties
        });
    }
    static is(value): value is Literal {
        return isLiteral(value);
    }
}
export function isLiteral(value): value is Literal {
    return Class.isInstance(Literal, value);
}
export default Literal;