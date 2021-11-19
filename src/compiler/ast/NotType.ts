/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Class from './ion/Class';
export class NotType implements _Object.Object , Type.Type , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly value: Type.Type;
    static readonly id = 'NotType';
    static readonly implements = new Set([
        'NotType',
        'ion_Object',
        'Type',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, value}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value: Type.Type
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Type.isType(value))
            throw new Error('value is not a Type: ' + Class.toString(value));
        this.location = location;
        this.type = type;
        this.value = value;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        value?: Type.Type
    }) {
        return new NotType({
            ...this,
            ...properties
        });
    }
    static is(value): value is NotType {
        return isNotType(value);
    }
}
export function isNotType(value): value is NotType {
    return Class.isInstance(NotType, value);
}
export default NotType;