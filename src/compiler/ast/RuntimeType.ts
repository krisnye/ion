/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class RuntimeType implements _Object.Object , Type.Type , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    static readonly id = 'RuntimeType';
    static readonly implements = new Set([
        'RuntimeType',
        'ion_Object',
        'Type',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean
    }) {
        return new RuntimeType({
            ...this,
            ...properties
        });
    }
    static is(value): value is RuntimeType {
        return isRuntimeType(value);
    }
}
export function isRuntimeType(value): value is RuntimeType {
    return Class.isInstance(RuntimeType, value);
}
export default RuntimeType;