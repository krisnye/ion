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
import * as _Array from './ion/Array';
import * as Class from './ion/Class';
export class IntersectionType implements _Object.Object , Type.Type , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly types: _Array.Array<Type.Type>;
    static readonly id = 'IntersectionType';
    static readonly implements = new Set([
        'IntersectionType',
        'ion_Object',
        'Type',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, types}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        types: _Array.Array<Type.Type>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(types))
            throw new Error('types is not a Array: ' + Class.toString(types));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.types = types;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        resolved?: Boolean.Boolean,
        types?: _Array.Array<Type.Type>
    }) {
        return new IntersectionType({
            ...this,
            ...properties
        });
    }
    static is(value): value is IntersectionType {
        return isIntersectionType(value);
    }
}
export function isIntersectionType(value): value is IntersectionType {
    return Class.isInstance(IntersectionType, value);
}
export default IntersectionType;