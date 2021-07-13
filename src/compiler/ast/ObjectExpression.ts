/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as Property from './Property';
import * as SpreadElement from './SpreadElement';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class ObjectExpression implements _Object.Object , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Expression.Expression | Null.Null;
    readonly properties: _Array.Array<Property.Property | SpreadElement.SpreadElement>;
    readonly isMap: Boolean.Boolean;
    static readonly id = 'ObjectExpression';
    static readonly implements = new Set([
        'ObjectExpression',
        'ion_Object',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, properties, isMap = false}: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        properties: _Array.Array<Property.Property | SpreadElement.SpreadElement>,
        isMap?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Expression.isExpression(type) || Null.isNull(type)))
            throw new Error('type is not a Expression | Null: ' + Class.toString(type));
        if (!_Array.isArray(properties))
            throw new Error('properties is not a Array: ' + Class.toString(properties));
        if (!Boolean.isBoolean(isMap))
            throw new Error('isMap is not a Boolean: ' + Class.toString(isMap));
        this.location = location;
        this.type = type;
        this.properties = properties;
        this.isMap = isMap;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Expression.Expression | Null.Null,
        properties?: _Array.Array<Property.Property | SpreadElement.SpreadElement>,
        isMap?: Boolean.Boolean
    }) {
        return new ObjectExpression({
            ...this,
            ...properties
        });
    }
    static is(value): value is ObjectExpression {
        return isObjectExpression(value);
    }
}
export function isObjectExpression(value): value is ObjectExpression {
    return Class.isInstance(ObjectExpression, value);
}
export default ObjectExpression;