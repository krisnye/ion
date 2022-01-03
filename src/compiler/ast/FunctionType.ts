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
import * as _Array from './ion/Array';
import * as Variable from './Variable';
import * as Class from './ion/Class';
export class FunctionType implements _Object.Object , Type.Type , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly resolved: Boolean.Boolean;
    readonly parameters: _Array.Array<Variable.Variable>;
    readonly returnType: Type.Type | Null.Null;
    static readonly id = 'FunctionType';
    static readonly implements = new Set([
        'FunctionType',
        'ion_Object',
        'Type',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({location = null, type = null, resolved = false, parameters, returnType = null}: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        parameters: _Array.Array<Variable.Variable>,
        returnType?: Type.Type | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!Boolean.isBoolean(resolved))
            throw new Error('resolved is not a Boolean: ' + Class.toString(resolved));
        if (!_Array.isArray(parameters))
            throw new Error('parameters is not a Array: ' + Class.toString(parameters));
        if (!(Type.isType(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Type | Null: ' + Class.toString(returnType));
        this.location = location;
        this.type = type;
        this.resolved = resolved;
        this.parameters = parameters;
        this.returnType = returnType;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        resolved?: Boolean.Boolean,
        parameters?: _Array.Array<Variable.Variable>,
        returnType?: Type.Type | Null.Null
    }) {
        return new FunctionType({
            ...this,
            ...properties
        });
    }
    static is(value): value is FunctionType {
        return isFunctionType(value);
    }
}
export function isFunctionType(value): value is FunctionType {
    return Class.isInstance(FunctionType, value);
}
export default FunctionType;