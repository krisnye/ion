/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as String from './ion/String';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as Class from './ion/Class';
export class ObjectType implements _Object.Object , Type.Type , Expression.Expression , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly kind: String.String;
    readonly properties: _Array.Array<Property.Property | Type.Type>;
    static readonly id = 'ObjectType';
    static readonly implements = new Set([
        'ObjectType',
        'ion_Object',
        'Type',
        'Expression',
        'Node'
    ]);
    constructor({location = null, type = null, kind, properties}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        kind: String.String,
        properties: _Array.Array<Property.Property | Type.Type>
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!String.isString(kind))
            throw new Error('kind is not a String: ' + Class.toString(kind));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        this.location = location;
        this.type = type;
        this.kind = kind;
        this.properties = properties;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        kind?: String.String,
        properties?: _Array.Array<Property.Property | Type.Type>
    }) {
        return new ObjectType({
            ...this,
            ...properties
        });
    }
    static is(value): value is ObjectType {
        return isObjectType(value);
    }
}
export function isObjectType(value): value is ObjectType {
    return Class.isInstance(ObjectType, value);
}
export default ObjectType;