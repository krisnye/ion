/*
This file was generated from ion source. Do not edit.
*/
import * as _Object from './ion/Object';
import * as Type from './Type';
import * as RuntimeType from './RuntimeType';
import * as Expression from './Expression';
import * as Typed from './Typed';
import * as Node from './Node';
import * as Location from './Location';
import * as Null from './ion/Null';
import * as _Array from './ion/Array';
import * as SpreadElement from './SpreadElement';
import * as Boolean from './ion/Boolean';
import * as Class from './ion/Class';
export class FunctionType implements _Object.Object , Type.Type , RuntimeType.RuntimeType , Expression.Expression , Typed.Typed , Node.Node {
    readonly location: Location.Location | Null.Null;
    readonly type: Type.Type | Null.Null;
    readonly params: _Array.Array<Type.Type | SpreadElement.SpreadElement>;
    readonly async: Boolean.Boolean;
    readonly returnType: Type.Type | Null.Null;
    static readonly id = 'FunctionType';
    static readonly implements = new Set([
        'FunctionType',
        'ion_Object',
        'Type',
        'RuntimeType',
        'Expression',
        'Typed',
        'Node'
    ]);
    constructor({
        location = null,
        type = null,
        params,
        async: _async = false,
        returnType = null
    }: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        params: _Array.Array<Type.Type | SpreadElement.SpreadElement>,
        async?: Boolean.Boolean,
        returnType?: Type.Type | Null.Null
    }) {
        if (!(Location.isLocation(location) || Null.isNull(location)))
            throw new Error('location is not a Location | Null: ' + Class.toString(location));
        if (!(Type.isType(type) || Null.isNull(type)))
            throw new Error('type is not a Type | Null: ' + Class.toString(type));
        if (!_Array.isArray(params))
            throw new Error('params is not a Array: ' + Class.toString(params));
        if (!Boolean.isBoolean(_async))
            throw new Error('async is not a Boolean: ' + Class.toString(_async));
        if (!(Type.isType(returnType) || Null.isNull(returnType)))
            throw new Error('returnType is not a Type | Null: ' + Class.toString(returnType));
        this.location = location;
        this.type = type;
        this.params = params;
        this.async = _async;
        this.returnType = returnType;
        Object.freeze(this);
    }
    patch(properties: {
        location?: Location.Location | Null.Null,
        type?: Type.Type | Null.Null,
        params?: _Array.Array<Type.Type | SpreadElement.SpreadElement>,
        async?: Boolean.Boolean,
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