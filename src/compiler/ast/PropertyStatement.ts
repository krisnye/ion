/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Statement from './Statement';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Type from './Type';
import * as Property from './Property';
import * as Class from './ion/Class';
export class PropertyStatement implements _Object.Object , Statement.Statement , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly property: Property.Property;
    static readonly id = 'PropertyStatement';
    static readonly implements = new Set([
        'PropertyStatement',
        'ion_Object',
        'Statement',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, property}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        property: Property.Property
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Property.isProperty(property))
            throw new Error('property is not a Property: ' + Class.toString(property));
        this.location = location;
        this.type = type;
        this.property = property;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        property?: Property.Property
    }) {
        return new PropertyStatement({
            ...this,
            ...properties
        });
    }
    static is(value): value is PropertyStatement {
        return isPropertyStatement(value);
    }
}
export function isPropertyStatement(value): value is PropertyStatement {
    return Class.isInstance(PropertyStatement, value);
}
export default PropertyStatement;