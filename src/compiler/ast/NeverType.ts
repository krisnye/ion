/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class NeverType implements _Object.Object , Type.Type , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    static readonly id = 'NeverType';
    static readonly implements = new Set([
        'NeverType',
        'ion_Object',
        'Type',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean
    }) {
        return new NeverType({
            ...this,
            ...properties
        });
    }
    static is(value): value is NeverType {
        return isNeverType(value);
    }
}
export function isNeverType(value): value is NeverType {
    return Class.isInstance(NeverType, value);
}
export default NeverType;